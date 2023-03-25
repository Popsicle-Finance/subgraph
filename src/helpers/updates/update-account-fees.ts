import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts';
import { Account, Optimizer } from '../../../generated/schema';
import { bigIntToBigDecimal } from '../../utils';
import { getOrCreateAccountState, getOrCreateAccountStateSnapshot } from '../account';
import { getOrCreateToken } from '../token';
import { PopsicleV3Optimizer } from '../../../generated/templates/UniswapV3Pool/PopsicleV3Optimizer';

export function updateAccountFees(optimizer: Optimizer, account: Account, fees: BigInt[], block: ethereum.Block): void {
    const contract = PopsicleV3Optimizer.bind(Address.fromString(optimizer.id));
    const state = getOrCreateAccountState(optimizer, account);
    const stateSnapshot = getOrCreateAccountStateSnapshot(optimizer, account, state, block);

    const token0 = getOrCreateToken(Address.fromString(optimizer.token0));
    const token1 = getOrCreateToken(Address.fromString(optimizer.token1));

    const fee0 = bigIntToBigDecimal(fees[0].times(state.shares).div(contract.totalSupply()), token0.decimals);
    const fee1 = bigIntToBigDecimal(fees[1].times(state.shares).div(contract.totalSupply()), token1.decimals);

    state.feesEarned0 = state.feesEarned0.plus(fee0);
    state.feesEarned1 = state.feesEarned1.plus(fee1);
    state.save();

    stateSnapshot.feesEarned0 = fee0;
    stateSnapshot.feesEarned1 = fee1;
    stateSnapshot.save();
}
