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

// Analytics
export const ANALYTICS_MAINNET_ADDRESS = '0x7d6e19b9c9A72F32225098B66acc3175F0d279Be';
export const ANALYTICS_ARBITRUM_ADDRESS = '0x9362aE06CC53cbd89518399a3da7509273B74720';
export const ANALYTICS_POLYGON_ADDRESS = '0x7934710F23E43c79410F37E3D0B5B109338538e2';

export const ETH_NETWORK = 'mainnet';
export const ARB_NETWORK = 'arbitrum-one';
export const MATIC_NETWORK = 'matic';
