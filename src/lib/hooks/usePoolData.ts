import { PoolInstance } from '@zero-tech/zfi-sdk';
import { useQuery } from 'react-query';
import { getPoolData } from '../util/pool';

export const usePoolData = (poolInstance: PoolInstance) => {
	return useQuery(
		['staking', 'pool', { poolAddress: poolInstance.address }],
		async () => getPoolData(poolInstance),
		{
			refetchOnWindowFocus: false,
		},
	);
};
