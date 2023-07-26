import { useQuery } from 'react-query';
import { usePoolByAddress } from './usePoolByAddress';

interface UseUserPoolDataParams {
	poolAddress: string;
	account: string;
}

export const useUserPoolData = ({
	poolAddress,
	account,
}: UseUserPoolDataParams) => {
	const { pool } = usePoolByAddress({ poolAddress });

	return useQuery(
		['user', { account, poolAddress }],
		async () => {
			const rewards = await pool.instance.pendingYieldRewards(account);
			return { rewards };
		},
		{
			enabled: Boolean(account) && Boolean(pool),
			refetchOnWindowFocus: false,
		},
	);
};
