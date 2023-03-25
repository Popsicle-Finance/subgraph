import { Address, ethereum } from '@graphprotocol/graph-ts';
import { getOrCreateOptimizer } from '../optimizer';
import { getOrCreateProtocol } from '../protocol';
import { createOptimizerSnapshot } from '../optimizer';

export function updateOptimizers(block: ethereum.Block): void {
    const protocol = getOrCreateProtocol();
    for (let i = 0; i < protocol.optimizerIds.length; i++) {
        const optimizerId = protocol.optimizerIds[i];
        const optimizer = getOrCreateOptimizer(Address.fromString(optimizerId));
        createOptimizerSnapshot(optimizer, block);
    }
}
