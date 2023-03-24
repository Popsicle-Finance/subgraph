import { ethereum, log } from '@graphprotocol/graph-ts';
import { Optimizer, OptimizerSnapshot } from '../../../generated/schema';

export function getOptimizerSnapshot(optimizer: Optimizer, block: ethereum.Block): OptimizerSnapshot | null {
    const snapshot = OptimizerSnapshot.load(`${optimizer.id}-${block.number.toHexString()}`);
    if (snapshot) return snapshot;
    log.error('Cannot find Optimizer snapshot: {}, {}', [optimizer.id, block.number.toString()]);
    return null;
}
