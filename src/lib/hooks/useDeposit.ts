import { useQuery } from 'react-query';
import { Deposit } from '@zero-tech/zfi-sdk';
import { useWeb3 } from './useWeb3';
import { useAllDeposits } from './useAllDeposits';

interface UseDepositParams {
	account: string;
	poolAddress: string;
	depositId: Deposit['depositId'];
}

export const useDeposit = ({
	account,
	poolAddress,
	depositId,
}: UseDepositParams) => {
	const { chainId } = useWeb3();
	const { data: deposits, isLoading: isLoadingDeposits } = useAllDeposits({
		account,
	});

	const query = useQuery(
		['staking', 'deposits', { chainId, account }],
		async () => {
			console.log('finding', poolAddress, depositId, deposits);
			console.log(
				'found',
				deposits.deposits.find(
					(d) =>
						d.poolInstance.address === poolAddress && d.depositId === depositId,
				),
			);
			return deposits.deposits.find(
				(d) =>
					d.poolInstance.address === poolAddress && d.depositId === depositId,
			);
		},

		{
			enabled: Boolean(account) && Boolean(deposits),
			refetchOnWindowFocus: false,
		},
	);

	return {
		...query,
		isLoading: query.isLoading || isLoadingDeposits,
	};
};
