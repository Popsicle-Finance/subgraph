import { BigInt, BigDecimal } from '@graphprotocol/graph-ts';

export namespace EventType {
    export const DEPOSIT = 'DEPOSIT';
    export const WITHDRAW = 'WITHDRAW';
}

export namespace AccountSnapshotType {
    export const COLLECT = 'COLLECT';
    export const WITHDRAW = 'WITHDRAW';
}

// Token
export const INVALID_TOKEN_DECIMALS = 0;
export const UNKNOWN_TOKEN_VALUE = 'unknown';

// Type Helpers
export const DEFAULT_DECIMALS = 18;

export const BIGINT_ZERO = BigInt.fromI32(0);
export const BIGINT_ONE = BigInt.fromI32(1);

export const BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);
export const BIGDECIMAL_ONE = new BigDecimal(BIGINT_ONE);

export const PROTOCOL_FEE = BigInt.fromI32(200000);
export const GLOBAL_DIVISIONER = BigInt.fromI32(1000000);
