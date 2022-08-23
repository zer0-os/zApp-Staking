import { useQuery } from 'react-query';
import useZnsSdk from './useZnsSdk';
import { PoolInstance } from '@zero-tech/zfi-sdk';

const useUserPoolTokenBalance = (
	account: string,
	poolInstance: PoolInstance,
) => {
	const znsSdk = useZnsSdk();

	return useQuery(`pool-${account}-${poolInstance.address}`, async () => {
		const tokenAddress = await poolInstance.getPoolToken();
		return await znsSdk.zauction.getUserBalanceForPaymentToken(
			account,
			tokenAddress,
		);
	});
};

export default useUserPoolTokenBalance;
