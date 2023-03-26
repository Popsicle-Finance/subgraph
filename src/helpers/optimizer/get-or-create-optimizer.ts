import { Address } from '@graphprotocol/graph-ts';
import { Optimizer } from '../../../generated/schema';
import { PopsicleV3Optimizer } from '../../../generated/templates/UniswapV3Pool/PopsicleV3Optimizer';
import { BIGINT_ZERO } from '../../constants';
import { getOrCreateProtocol } from '../protocol';
import { getOrCreateToken } from '../token';

export function getOrCreateOptimizer(optimizerAddress: Address): Optimizer {
    let optimizer = Optimizer.load(optimizerAddress.toHexString());
    if (optimizer) return optimizer;

    const contract = PopsicleV3Optimizer.bind(optimizerAddress);

    optimizer = new Optimizer(optimizerAddress.toHexString());
    const protocol = getOrCreateProtocol();

    const token0 = getOrCreateToken(contract.token0());
    const token1 = getOrCreateToken(contract.token1());

    optimizer.protocol = protocol.id;
    optimizer.name = contract.name();
    optimizer.token0 = token0.id;
    optimizer.token1 = token1.id;
    optimizer.pool = contract.pool().toHexString();
    optimizer.lastCollectBlock = BIGINT_ZERO;
    optimizer.save();

    const optimizerIds = protocol.optimizerIds;
    optimizerIds.push(optimizerAddress.toHexString());
    protocol.optimizerIds = optimizerIds;

    protocol.save();

    return optimizer;
}
