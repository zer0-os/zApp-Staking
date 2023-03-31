import { useQuery } from 'react-query';
import { useZnsSdk } from './useZnsSdk';
import { PoolInstance } from '@zero-tech/zfi-sdk';

export const useUserPoolTokenBalance = (
	account: string,
	poolInstance: PoolInstance,
) => {
	const znsSdk = useZnsSdk();

	return useQuery(
		['user', 'balance', { account, poolAddress: poolInstance.address }],
		async () => {
			const tokenAddress = await poolInstance.getPoolToken();
			return await znsSdk.zauction.getUserBalanceForPaymentToken(
				account,
				tokenAddress,
			);
		},
		{
			enabled: Boolean(account),
			refetchOnWindowFocus: false,
		},
	);
};
