import { useQuery } from 'react-query';
import { useZnsSdk } from './useZnsSdk';
import { usePoolByAddress } from './usePoolByAddress';

interface UseUserPoolTokenBalanceParams {
	poolAddress: string;
	account: string;
}

export const useUserPoolTokenBalance = ({
	account,
	poolAddress,
}: UseUserPoolTokenBalanceParams) => {
	const znsSdk = useZnsSdk();
	const { pool } = usePoolByAddress({ poolAddress });

	return useQuery(
		['user', 'balance', { account, poolAddress }],
		async () => {
			const tokenAddress = await pool.instance.getPoolToken();
			return await znsSdk.zauction.getUserBalanceForPaymentToken(
				account,
				tokenAddress,
			);
		},
		{
			enabled: Boolean(account) && Boolean(pool),
			refetchOnWindowFocus: false,
		},
	);
};
