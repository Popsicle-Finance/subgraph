import { BigInt, ethereum, log } from '@graphprotocol/graph-ts';
import { Optimizer, OptimizerSnapshot } from '../../../generated/schema';

export function getOptimizerSnapshot(optimizer: Optimizer, blockNumber: BigInt): OptimizerSnapshot | null {
    const snapshot = OptimizerSnapshot.load(`${optimizer.id}-${blockNumber.toHexString()}`);
    if (snapshot) return snapshot;
    log.error('Cannot find Optimizer snapshot: {}, {}', [optimizer.id, blockNumber.toString()]);
    return null;
}
