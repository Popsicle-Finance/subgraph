import { ETH_NETWORK, ARB_NETWORK, MATIC_NETWORK, ANALYTICS_ARBITRUM_ADDRESS, ANALYTICS_MAINNET_ADDRESS, ANALYTICS_POLYGON_ADDRESS } from '../constants';

export function getAnalyticAddress(network: string): string {
    if (network == ETH_NETWORK) {
        return ANALYTICS_MAINNET_ADDRESS;
    } else if (network == MATIC_NETWORK) {
        return ANALYTICS_POLYGON_ADDRESS;
    } else if (network == ARB_NETWORK) {
        return ANALYTICS_ARBITRUM_ADDRESS;
    }
    return '';
}
