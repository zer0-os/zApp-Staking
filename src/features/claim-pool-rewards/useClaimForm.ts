import { useState } from 'react';

import { useWeb3 } from '../../lib/hooks/useWeb3';
import { useUserPoolData } from '../../lib/hooks/useUserPoolData';
import { PoolInstance } from '@zero-tech/zfi-sdk';
import { useTransaction } from '../../lib/useTransaction';

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
export const useClaimForm = (poolInstance: PoolInstance) => {
	const { provider, account } = useWeb3();
	const { executeTransaction } = useTransaction();

	const { data, isLoading, isRefetching } = useUserPoolData(
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

	const claim = () => {
		return executeTransaction(
			poolInstance.processRewards,
			[provider.getSigner()],
			{
				onStart: () => setStep(ClaimFormStep.WAITING_FOR_WALLET),
				onProcessing: () => setStep(ClaimFormStep.PROCESSING),
				onSuccess: () => setStep(ClaimFormStep.COMPLETE),
				onError: (error) => {
					setError(error.message);
					setStep(ClaimFormStep.AMOUNT);
				},
				invalidationKeys: [
					['user', { account, poolAddress: poolInstance.address }],
				],
			},
		);
	};

	return {
		isLoadingUserData: isLoading || isRefetching,
		amountWei: data?.rewards,
		step,
		error,
		onConfirmClaimAmount,
		claim,
	};
};
