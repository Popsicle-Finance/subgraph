import { Account, AccountState, Optimizer } from '../../../generated/schema';
import { BIGINT_ZERO } from '../../constants';

export function getOrCreateAccountState(optimizer: Optimizer, account: Account): AccountState {
    const id = `${optimizer.id}-${account.id}`;
    let state = AccountState.load(id);
    if (!state) {
        state = new AccountState(id);
        state.account = account.id;
        state.optimizer = optimizer.id;
        state.shares = BIGINT_ZERO;
        state.save();

        const stateIds = account.stateIds;
        stateIds.push(id);
        account.stateIds = stateIds;

        account.save();
    }
    return state;
}
