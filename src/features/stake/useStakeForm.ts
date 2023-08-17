import { useState } from 'react';
import { BigNumber } from 'ethers';
import { PoolInstance } from '@zero-tech/zfi-sdk';
import { useWeb3 } from '@/lib/hooks/useWeb3';
import { useStake } from './useStake';
import { useUserPoolTokenBalance } from '@/lib/hooks/useUserPoolTokenBalance';
import { useUserPoolData } from '@/lib/hooks/useUserPoolData';

export enum StakeFormStep {
	CONNECT_WALLET,
	AMOUNT,
	APPROVE,
	WAITING_FOR_WALLET,
	PROCESSING,
	COMPLETE,
}

/**
 * Drives the stake form UI.
 */
export const useStakeForm = (poolInstance: PoolInstance) => {
	const { provider, account } = useWeb3();

	const initialStep =
		!account || !provider ? StakeFormStep.CONNECT_WALLET : StakeFormStep.AMOUNT;

	const {
		data: userPoolTokenBalance,
		isLoading: isLoadingUserPoolTokenBalance,
	} = useUserPoolTokenBalance({ account, poolAddress: poolInstance.address });

	const { data: userQueryData, isLoading: isLoadingUserData } = useUserPoolData(
		{ poolAddress: poolInstance.address, account },
	);

	const [amountWei, setAmountWei] = useState<BigNumber | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [step, setStep] = useState<StakeFormStep>(initialStep);

	const { stake } = useStake({
		onStart: () => {
			setStep(StakeFormStep.WAITING_FOR_WALLET);
			setError(undefined);
		},
		onProcessing: () => setStep(StakeFormStep.PROCESSING),
		onSuccess: () => setStep(StakeFormStep.COMPLETE),
		onError: (error: Error) => {
			setStep(StakeFormStep.AMOUNT);
			setError(error.message);
			console.error('Failed to stake in pool!', {
				error,
				account,
				pool: poolInstance.address,
			});
		},
	});

	/**
	 * Sets the stake amount and moves onto the approval step.
	 * @param amount amount of tokens in wei
	 */
	const onConfirmAmount = (amount: BigNumber) => {
		setError(undefined);
		if (amount._isBigNumber && amount.gt(0)) {
			setAmountWei(amount);
			setStep(StakeFormStep.APPROVE);
		}
	};

	/**
	 * Triggers the stake transaction with the amount stored in state
	 */
	const onStartTransaction = () => {
		(async () => {
			if (amountWei !== undefined && poolInstance !== undefined) {
				stake(amountWei, poolInstance);
			}
		})();
	};

	return {
		amountWei,
		userPoolTokenBalance,
		userRewardsClaimable: userQueryData?.rewards,
		isLoadingUserRewards: isLoadingUserData,
		isLoadingUserPoolTokenBalance,
		step,
		error,
		onConfirmAmount,
		onStartTransaction,
	};
};
