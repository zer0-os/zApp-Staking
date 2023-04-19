import { useQuery } from 'react-query';
import { usePoolData } from './usePoolData';
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
			const [deposits, rewards] = await Promise.all([
				pool.instance.getAllDeposits(account),
				pool.instance.pendingYieldRewards(account),
			]);
			return { deposits, rewards };
		},
		{
			enabled: Boolean(account) && Boolean(pool),
			refetchOnWindowFocus: false,
		},
	);
};
