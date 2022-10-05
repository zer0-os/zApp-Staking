import { useMutation, useQueryClient } from 'react-query';
import { BigNumber } from 'ethers';
import { Deposit, PoolInstance } from '@zero-tech/zfi-sdk';

import useWeb3 from '../../lib/hooks/useWeb3';

interface UnstakeParams {
	amountWei: BigNumber;
	depositId: Deposit['depositId'];
	poolInstance: PoolInstance;
}

interface UseUnstakeParams {
	onStart?: () => void;
	onProcessing?: () => void;
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}

export const useUnstake = ({
	onStart,
	onProcessing,
	onError,
	onSuccess,
}: UseUnstakeParams) => {
	const { provider, account } = useWeb3();
	const queryClient = useQueryClient();

	const stakeMutation = async ({
		amountWei,
		depositId,
		poolInstance,
	}: UnstakeParams) => {
		if (!account || !provider) {
			throw new Error('No account or provider');
		}
		onStart?.();
		const tx = await poolInstance.unstake(
			depositId,
			amountWei.toString(),
			provider.getSigner(),
		);
		onProcessing?.();
		return tx.wait();
	};

	const { mutateAsync: unstake } = useMutation(stakeMutation, {
		onSuccess: async (_, { poolInstance }) => {
			// invalidate all user data for pool address
			await queryClient.invalidateQueries([
				'user',
				{ account, poolAddress: poolInstance.address },
			]);
			onSuccess?.();
		},
		onError,
	});

	return {
		unstake,
	};
};
