import { ethereum } from '@graphprotocol/graph-ts';
import { Account, AccountStateSnapshot, Optimizer, AccountState } from '../../../generated/schema';
import { BIGINT_ZERO } from '../../constants';

export function getOrCreateAccountStateSnapshot(optimizer: Optimizer, account: Account, state: AccountState, block: ethereum.Block): AccountStateSnapshot {
    const id = `${optimizer.id}-${account.id}-${block.number.toHexString()}`;
    let snapshot = AccountStateSnapshot.load(id);
    if (!snapshot) {
        snapshot = new AccountStateSnapshot(id);
        snapshot.account = account.id;
        snapshot.optimizer = optimizer.id;
        snapshot.state = state.id;
        snapshot.shares = BIGINT_ZERO;
        snapshot.blockNumber = block.number;
        snapshot.timestamp = block.timestamp;
        snapshot.save();
    }
    return snapshot;
}
