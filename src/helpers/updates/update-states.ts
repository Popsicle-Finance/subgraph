import { Address, ethereum } from '@graphprotocol/graph-ts';
import { Account, AccountState, Optimizer } from '../../../generated/schema';
import { PopsicleV3Optimizer } from '../../../generated/templates/UniswapV3Pool/PopsicleV3Optimizer';
import { EventType } from '../../constants';
import { getOrCreateProtocol } from '../protocol';
import { updateAccountState } from './update-account-state';

export function updateStates(block: ethereum.Block): void {
    const protocol = getOrCreateProtocol();
    for (let i = 0; i < protocol.accountIds.length; i++) {
        const accountId = protocol.accountIds[i];
        const account = Account.load(accountId);
        if (!account) continue;
        for (let j = 0; j < account.stateIds.length; j++) {
            const stateId = account.stateIds[j];
            const state = AccountState.load(stateId);
            if (!state) continue;
            const optimizer = Optimizer.load(state.optimizer);
            if (!optimizer) continue;
            const contract = PopsicleV3Optimizer.bind(Address.fromString(state.optimizer));
            const accountAddress = Address.fromString(account.id);
            const balance = contract.balanceOf(accountAddress);
            updateAccountState(optimizer, accountAddress, EventType.UPDATE, balance, block);
        }
    }
}
