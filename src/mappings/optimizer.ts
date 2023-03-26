import { Deposit, CollectFees, Withdraw } from '../../generated/templates/UniswapV3Pool/PopsicleV3Optimizer';
import { EventType, GLOBAL_DIVISIONER, PROTOCOL_FEE } from '../constants';
import { getOrCreateOptimizer } from '../helpers/optimizer';
import { updateAccountState, updateFees } from '../helpers/updates';

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
    const optimizerAddress = event.address;
    const optimizer = getOrCreateOptimizer(optimizerAddress);
    if (!optimizer) return;

    const feesFromPool0 = event.params.feesFromPool0.minus(event.params.feesFromPool0.times(PROTOCOL_FEE).div(GLOBAL_DIVISIONER));
    const feesFromPool1 = event.params.feesFromPool1.minus(event.params.feesFromPool1.times(PROTOCOL_FEE).div(GLOBAL_DIVISIONER));

    updateFees(optimizer, [feesFromPool0, feesFromPool1], event.block);
}
