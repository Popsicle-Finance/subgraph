import { Deposit, CollectFees, Withdraw } from '../../generated/templates/UniswapV3Pool/PopsicleV3Optimizer';
import { EventType } from '../constants';
import { getOrCreateOptimizer } from '../helpers/optimizer';
import { updateAccountState, updateOptimizers, updateStates } from '../helpers/updates';

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
    updateAccountState(optimizer, event.params.sender, EventType.DEPOSIT, event.params.shares, event.block);
}

export function handleLogCollectFees(event: CollectFees): void {
    updateOptimizers(event.block);
    updateStates(event.block);
}
