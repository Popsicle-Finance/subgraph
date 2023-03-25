import { Address, ethereum } from '@graphprotocol/graph-ts';
import { Optimizer, OptimizerSnapshot } from '../../../generated/schema';
import { PopsicleV3Optimizer } from '../../../generated/templates/UniswapV3Pool/PopsicleV3Optimizer';

export function createOptimizerSnapshot(optimizer: Optimizer, block: ethereum.Block): void {
    const contract = PopsicleV3Optimizer.bind(Address.fromString(optimizer.id));
    const totalSupplyCall = contract.try_totalSupply();
    if (totalSupplyCall.reverted) return;

    const snapshot = new OptimizerSnapshot(`${optimizer.id}-${block.number.toHexString()}`);
    snapshot.optimizer = optimizer.id;
    snapshot.totalSupply = totalSupplyCall.value;
    snapshot.blockNumber = block.number;
    snapshot.timestamp = block.timestamp;
    snapshot.save();
}
