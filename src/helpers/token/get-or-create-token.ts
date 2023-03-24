import { Address } from '@graphprotocol/graph-ts';
import { Token } from '../../../generated/schema';
import { getTokenDecimals } from './get-token-decimals';
import { getTokenName } from './get-token-name';
import { getTokenSymbol } from './get-token-symbol';
import { BIGINT_ZERO, BIGDECIMAL_ZERO } from '../../constants';

export function getOrCreateToken(address: Address): Token {
    let token = Token.load(address.toHexString());
    if (!token) {
        token = new Token(address.toHexString());
        token.symbol = getTokenSymbol(address);
        token.name = getTokenName(address);
        token.decimals = getTokenDecimals(address);
        token.lastPriceUsd = BIGDECIMAL_ZERO;
        token.lastPriceBlockNumber = BIGINT_ZERO;
        token.lastPriceTimestamp = BIGINT_ZERO;
        token.save();
    }
    return token;
}
