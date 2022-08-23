import { useState } from 'react';

import useWeb3 from '../../lib/hooks/useWeb3';
import useUserPoolData from '../../lib/hooks/useUserPoolData';
import { PoolInstance } from '@zero-tech/zfi-sdk';
import { TransactionErrors } from '../../lib/constants/messages';
import { formatEther } from 'ethers/lib/utils';

export enum ClaimFormStep {
	AMOUNT,
	CONFIRM,
	WAITING_FOR_WALLET,
	PROCESSING,
	COMPLETE,
}

/**
 * Drives the logic behind the claim form.
 */
const useClaimForm = (poolInstance: PoolInstance) => {
	const { provider, account } = useWeb3();

	const { data, isLoading, isRefetching, refetch } = useUserPoolData(
		poolInstance,
		account,
	);

	const [error, setError] = useState<string | undefined>();
	const [step, setStep] = useState<ClaimFormStep>(ClaimFormStep.AMOUNT);

	/**
	 * Checks amount is valid and progresses to the next step.
	 */
	const onConfirmClaimAmount = () => {
		if (data?.rewards.gt(0)) {
			setError(undefined);
			setStep(ClaimFormStep.CONFIRM);
		}
	};

	/**
	 * Triggers a series of wallet confirmations, and progresses steps accordingly.
	 */
	const onConfirmClaim = () => {
		(async () => {
			try {
				let tx;
				setStep(ClaimFormStep.WAITING_FOR_WALLET);
				try {
					tx = await poolInstance.processRewards(provider.getSigner());
				} catch {
					throw TransactionErrors.PRE_WALLET;
				}
				setStep(ClaimFormStep.PROCESSING);
				try {
					await tx.wait();
				} catch {
					throw TransactionErrors.POST_WALLET;
				}
				setStep(ClaimFormStep.COMPLETE);
				refetch(); // refetch user data
			} catch (e: any) {
				setError(e.message);
				setStep(ClaimFormStep.AMOUNT);
			}
		})();
	};

	return {
		isLoadingUserData: isLoading || isRefetching,
		claimableAmount: data?.rewards
			? Number(formatEther(data.rewards))
			: undefined,
		step,
		error,
		onConfirmClaimAmount,
		onConfirmClaim,
	};
};

export default useClaimForm;
