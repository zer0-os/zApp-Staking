import { useQuery } from 'react-query';
import { getPoolData } from '../util/pool';
import { usePoolByAddress } from './usePoolByAddress';

interface UsePoolDataParams {
	poolAddress: string;
}

export const usePoolData = ({ poolAddress }: UsePoolDataParams) => {
	const { pool } = usePoolByAddress({ poolAddress });

	return useQuery(
		['staking', 'pool', { poolAddress }],
		async () => {
			return await getPoolData(pool.instance);
		},
		{
			refetchOnWindowFocus: false,
			enabled: Boolean(pool),
		},
	);
};
