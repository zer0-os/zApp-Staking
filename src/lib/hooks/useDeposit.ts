import { useQuery } from 'react-query';
import { PoolInstance } from '@zero-tech/zfi-sdk';
import { Deposit } from '@zero-tech/zfi-sdk';
import { useWeb3 } from './useWeb3';

export const useDeposit = (
	account: string,
	poolInstance: PoolInstance,
	depositId: Deposit['depositId'],
) => {
	const { chainId } = useWeb3();

	return useQuery(
		['staking', 'deposits', { chainId, account }],
		async () => {
			const deposits = await poolInstance.getAllDeposits(account);
			return deposits.filter((d) => d.depositId === depositId)[0];
		},
		{
			enabled: Boolean(account),
			refetchOnWindowFocus: false,
		},
	);
};
