import { PoolInstance, TotalValueLocked } from '@zero-tech/zfi-sdk';

export interface PoolData {
	apr: number;
	tvl: TotalValueLocked;
}

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
