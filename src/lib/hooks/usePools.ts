import { useZfiSdk } from './useZfiSdk';
import { POOL_METADATA } from '../constants/pools';
import { useMemo } from 'react';

export const usePools = () => {
	const zfiSdk = useZfiSdk();

	const pools = useMemo(() => {
		return [
			{
				address: zfiSdk.wildPool.address,
				instance: zfiSdk.wildPool,
				metadata: POOL_METADATA.WILD_POOL,
			},
			{
				address: zfiSdk.liquidityPool.address,
				instance: zfiSdk.liquidityPool,
				metadata: POOL_METADATA.LP_POOL,
			},
		];
	}, [zfiSdk]);

	return {
		wildPool: pools[0],
		liquidityPool: pools[1],
		numPools: pools.length,
	};
};
