import { PoolInstance, TotalValueLocked } from '@zero-tech/zfi-sdk';
import { PoolData } from '../types/pool';
import { corePoolContract } from '@/lib/contracts/core-pool';

export const getPoolData = async (
	pool: PoolInstance,
): Promise<PoolData | undefined> => {
	const promises = [pool.poolApr(), pool.poolTvl()];
	const [apr, tvl] = await Promise.all(promises);

	return {
		apr: apr as number,
		tvl: tvl as TotalValueLocked,
	} as PoolData;
};
