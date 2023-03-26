import { dataSource, Address } from '@graphprotocol/graph-ts';
import { Deposit, CollectFees, Withdraw } from '../../generated/templates/UniswapV3Pool/PopsicleV3Optimizer';
import { PopsicleAnalytics } from '../../generated/templates/UniswapV3Pool/PopsicleAnalytics';
import { EventType, GLOBAL_DIVISIONER, PROTOCOL_FEE } from '../constants';
import { getOrCreateOptimizer } from '../helpers/optimizer';
import { updateAccountState, updateFees } from '../helpers/updates';
import { getAnalyticAddress } from '../helpers/get-analytic-address';

export function handleLogDeposit(event: Deposit): void {
    const optimizerAddress = event.address;
    const optimizer = getOrCreateOptimizer(optimizerAddress);
    if (!optimizer) return;
    updateAccountState(optimizer, event.params.recipient, EventType.DEPOSIT, event.params.share, event.block);
}

export function handleLogWithdraw(event: Withdraw): void {
    const optimizerAddress = event.address;
    const optimizer = getOrCreateOptimizer(optimizerAddress);
    if (!optimizer) return;
    updateAccountState(optimizer, event.params.sender, EventType.WITHDRAW, event.params.shares, event.block);
}

export function handleLogCollectFees(event: CollectFees): void {
    const analyticAddress = getAnalyticAddress(dataSource.network());
    const optimizerAddress = event.address;
    const optimizer = getOrCreateOptimizer(optimizerAddress);
    if (!optimizer) return;

    let feesFromPool0 = event.params.feesFromPool0;
    let feesFromPool1 = event.params.feesFromPool1;

    const analytic = PopsicleAnalytics.bind(Address.fromString(analyticAddress));
    const burnZeroLiquidityCall = analytic.try_burnZeroLiquidity(Address.fromString(optimizer.id));
    if (!burnZeroLiquidityCall.reverted && optimizer.lastCollectBlock != event.block.number) {
        feesFromPool0 = feesFromPool0.plus(burnZeroLiquidityCall.value.getValue0());
        feesFromPool1 = feesFromPool1.plus(burnZeroLiquidityCall.value.getValue1());

        optimizer.lastCollectBlock = event.block.number;
        optimizer.save();
    }

    feesFromPool0 = feesFromPool0.minus(feesFromPool0.times(PROTOCOL_FEE).div(GLOBAL_DIVISIONER));
    feesFromPool1 = feesFromPool1.minus(feesFromPool1.times(PROTOCOL_FEE).div(GLOBAL_DIVISIONER));

    updateFees(optimizer, [feesFromPool0, feesFromPool1], event.block);
}
