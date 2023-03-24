import { dataSource } from '@graphprotocol/graph-ts';
import { Protocol } from '../../../generated/schema';

export function getOrCreateProtocol(): Protocol {
    const protocolId = `popsicle-${dataSource.network()}`;
    let protocol = Protocol.load(protocolId);
    if (protocol) return protocol;
    protocol = new Protocol(protocolId);

    protocol.optimizerIds = [];
    protocol.accountIds = [];
    protocol.save();
    return protocol;
}
