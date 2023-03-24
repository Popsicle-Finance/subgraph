import { ethereum } from '@graphprotocol/graph-ts';
import { getOrCreateNetwork } from '../helpers/get-or-create-network';
import { updateOptimizers, updateStates } from '../helpers/updates';

export function handleBlock(block: ethereum.Block): void {
    let network = getOrCreateNetwork();
    network.currentBlock = block.number;
    network.save();

    updateStates(block);
    updateOptimizers(block);
}
