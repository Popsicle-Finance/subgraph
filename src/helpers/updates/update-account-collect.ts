import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts';
import { Account, Optimizer } from '../../../generated/schema';
import { AccountSnapshotType } from '../../constants';
import { bigIntToBigDecimal } from '../../utils';
import { getOrCreateAccountState, getOrCreateAccountStateSnapshot } from '../account';
import { getOrCreateToken } from '../token';

export function updateAccountCollect(optimizer: Optimizer, account: Account, fees: BigInt[], block: ethereum.Block): void {
    const state = getOrCreateAccountState(optimizer, account);
    const stateSnapshot = getOrCreateAccountStateSnapshot(optimizer, account, state, block);

    const token0 = getOrCreateToken(Address.fromString(optimizer.token0));
    const token1 = getOrCreateToken(Address.fromString(optimizer.token1));

    const fee0 = bigIntToBigDecimal(fees[0], token0.decimals);
    const fee1 = bigIntToBigDecimal(fees[1], token1.decimals);

    state.feesEarned0 = state.feesEarned0.minus(fee0);
    state.feesEarned1 = state.feesEarned1.minus(fee1);
    state.save();

    stateSnapshot.type = AccountSnapshotType.WITHDRAW;
    stateSnapshot.feesEarned0 = fee0;
    stateSnapshot.feesEarned1 = fee1;
    stateSnapshot.save();
}
