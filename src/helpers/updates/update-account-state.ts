import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts';
import { Optimizer } from '../../../generated/schema';
import { getOrCreateAccount, getOrCreateAccountState, getOrCreateAccountStateSnapshot } from '../account';
import { EventType } from '../../constants';
import { UniswapV3Pool } from '../../../generated/templates/UniswapV3Pool/UniswapV3Pool';

export function updateAccountState(optimizer: Optimizer, accountAddress: Address, eventType: string, amount: BigInt, block: ethereum.Block): void {
    const account = getOrCreateAccount(accountAddress.toHexString());
    const accountState = getOrCreateAccountState(optimizer, account);
    const pool = UniswapV3Pool.bind(Address.fromString(optimizer.pool));

    if (eventType == EventType.DEPOSIT) {
        accountState.shares = accountState.shares.plus(amount);
    }

    if (eventType == EventType.WITHDRAW) {
        accountState.shares = accountState.shares.minus(amount);
    }

    if (eventType == EventType.UPDATE) {
        accountState.shares = amount;
    }

    accountState.save();

    const accountStateSnapshot = getOrCreateAccountStateSnapshot(optimizer, account, accountState, block);
    accountStateSnapshot.shares = accountState.shares;

    const liquidity = optimizer.liquidity.times(accountState.shares).div(optimizer.totalSupply);
    accountStateSnapshot.liquidity = liquidity;
    accountState.liquidity = liquidity;
    accountState.save();

    accountStateSnapshot.save();
}
