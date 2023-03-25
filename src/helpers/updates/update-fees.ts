import { BigInt, ethereum } from '@graphprotocol/graph-ts';
import { AccountState, Optimizer } from '../../../generated/schema';
import { getOrCreateAccount } from '../account';
import { getOrCreateProtocol } from '../protocol';
import { updateAccountFees } from './update-account-fees';

export function updateFees(optimizer: Optimizer, fees: BigInt[], block: ethereum.Block): void {
    const protocol = getOrCreateProtocol();
    for (let i = 0; i < protocol.accountIds.length; i++) {
        const account = getOrCreateAccount(protocol.accountIds[i]);
        const accountState = AccountState.load(`${optimizer.id}-${account.id}`);
        if (accountState) {
            updateAccountFees(optimizer, account, fees, block);
        }
    }
}
