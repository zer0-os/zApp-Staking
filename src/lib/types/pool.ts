import { PoolInstance, TotalValueLocked } from '@zero-tech/zfi-sdk';
import { POOL_METADATA, PoolMetadata } from '../constants/pools';

export interface PoolInfo {
	poolInstance: PoolInstance;
	poolMetadata: PoolMetadata;
}

export interface PoolData {
	address: string;
	instance: PoolInstance;
	metadata: PoolMetadata;
}

export interface PoolData {
	apr: number;
	tvl: TotalValueLocked;
}
