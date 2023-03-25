import { Address, ethereum, BigInt } from '@graphprotocol/graph-ts';
import { Optimizer, OptimizerSnapshot } from '../../../generated/schema';
import { PopsicleV3Optimizer } from '../../../generated/templates/UniswapV3Pool/PopsicleV3Optimizer';

export function createOptimizerSnapshot(optimizer: Optimizer, block: ethereum.Block): void {
    const contract = PopsicleV3Optimizer.bind(Address.fromString(optimizer.id));
    const totalSupplyCall = contract.try_totalSupply();
    const positionCall = contract.try_position();
    const tickLowerCall = contract.try_tickLower();
    const tickUpperCall = contract.try_tickUpper();

    if (totalSupplyCall.reverted || positionCall.reverted || tickLowerCall.reverted || tickUpperCall.reverted) return;

    const snapshot = new OptimizerSnapshot(`${optimizer.id}-${block.number.toHexString()}`);
    snapshot.optimizer = optimizer.id;
    snapshot.totalSupply = totalSupplyCall.value;
    snapshot.blockNumber = block.number;
    snapshot.liquidity = positionCall.value.getLiquidity();
    snapshot.timestamp = block.timestamp;
    snapshot.tickLower = BigInt.fromI32(tickLowerCall.value);
    snapshot.tickUpper = BigInt.fromI32(tickUpperCall.value);
    snapshot.save();

    optimizer.totalSupply = totalSupplyCall.value;
    optimizer.liquidity = positionCall.value.getLiquidity();
    optimizer.tickLower = BigInt.fromI32(tickLowerCall.value);
    optimizer.tickUpper = BigInt.fromI32(tickUpperCall.value);
    optimizer.save();
}
