import { Network } from '../../generated/schema';
import { dataSource } from '@graphprotocol/graph-ts';
import { BIGINT_ZERO } from '../constants';

export function getOrCreateNetwork(): Network {
    let network = Network.load(dataSource.network());

    if (!network) {
        network = new Network(dataSource.network());
        network.currentBlock = BIGINT_ZERO;
        network.save();
    }

    return network;
}
