import { BigInt, BigDecimal } from '@graphprotocol/graph-ts';

// Token
export const INVALID_TOKEN_DECIMALS = 0;
export const UNKNOWN_TOKEN_VALUE = 'unknown';

// Type Helpers
export const DEFAULT_DECIMALS = 18;

export const BIGINT_ZERO = BigInt.fromI32(0);
export const BIGINT_ONE = BigInt.fromI32(1);

export const BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);
export const BIGDECIMAL_ONE = new BigDecimal(BIGINT_ONE);
