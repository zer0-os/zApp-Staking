import { useQuery } from 'react-query';
import { BigNumber, providers } from 'ethers';
import { PoolInstance } from '@zero-tech/zfi-sdk';
import { parseEther } from 'ethers/lib/utils';
import useWeb3 from '../../../lib/hooks/useWeb3';

/**
 * Checks if a given user (provider) has approved
 * pool spending over the specified amount.
 * @param amountToApprove number of tokens to check allowance against
 * @param poolInstance pool to check approval for
 */
const usePoolSpendingAllowance = (
	amountToApprove: BigNumber,
	poolInstance: PoolInstance,
) => {
	const { account, provider } = useWeb3();

	// @TODO: include account number in the query ID
	return useQuery(
		['user', 'allowance', { account, poolAddress: poolInstance.address }],
		async () => {
			const allowance = await poolInstance.allowance(provider.getSigner());
			return allowance.lte(amountToApprove);
		},
		{ refetchOnWindowFocus: false, enabled: provider && account !== undefined },
	);
};

export default usePoolSpendingAllowance;
