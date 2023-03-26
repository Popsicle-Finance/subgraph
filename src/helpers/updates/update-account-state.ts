import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts';
import { Optimizer } from '../../../generated/schema';
import { getOrCreateAccount, getOrCreateAccountState, getOrCreateAccountStateSnapshot } from '../account';
import { EventType } from '../../constants';

export function updateAccountState(optimizer: Optimizer, accountAddress: Address, eventType: string, amount: BigInt, block: ethereum.Block): void {
    const account = getOrCreateAccount(accountAddress.toHexString());
    const accountState = getOrCreateAccountState(optimizer, account);

    if (eventType == EventType.DEPOSIT) {
        accountState.shares = accountState.shares.plus(amount);
    }

    if (eventType == EventType.WITHDRAW) {
        accountState.shares = accountState.shares.minus(amount);
    }

    accountState.save();

    const accountStateSnapshot = getOrCreateAccountStateSnapshot(optimizer, account, accountState, block);
    accountStateSnapshot.shares = accountState.shares;
    accountStateSnapshot.save();
}
