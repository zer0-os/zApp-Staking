import { useState } from 'react';

import { BigNumber } from 'ethers';
import { Deposit, PoolInstance } from '@zero-tech/zfi-sdk';
import { useWeb3 } from '../../lib/hooks/useWeb3';
import { useDeposit } from '../../lib/hooks/useDeposit';
import { useUnstake } from './useUnstake';

export enum UnstakeFormStep {
	AMOUNT,
	APPROVE,
	CONFIRM,
	WAITING_FOR_WALLET,
	PROCESSING,
	COMPLETE,
}

interface UseUnstakeFormParams {
	poolInstance: PoolInstance;
	depositId: Deposit['depositId'];
}

export const useUnstakeForm = ({
	poolInstance,
	depositId,
}: UseUnstakeFormParams) => {
	const { account } = useWeb3();

	const [amountWei, setAmountWei] = useState<BigNumber | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [step, setStep] = useState<UnstakeFormStep>(UnstakeFormStep.AMOUNT);

	const { data: deposit, isLoading: isLoadingDeposit } = useDeposit({
		account,
		poolAddress: poolInstance.address,
		depositId,
	});

	console.log('deposit', deposit);

	const { unstake } = useUnstake({
		onStart: () => {
			setStep(UnstakeFormStep.WAITING_FOR_WALLET);
			setError(undefined);
		},
		onProcessing: () => setStep(UnstakeFormStep.PROCESSING),
		onSuccess: () => setStep(UnstakeFormStep.COMPLETE),
		onError: (error: Error) => {
			setStep(UnstakeFormStep.AMOUNT);
			setError(error.message);
			console.error('Failed to unstake from	 pool!', {
				error,
				account,
				amountWei,
				deposit,
				pool: poolInstance.address,
			});
		},
	});

	const onConfirmAmount = (amount: BigNumber) => {
		setError(undefined);
		if (amount._isBigNumber && amount.gt(0)) {
			setAmountWei(amount);
			setStep(UnstakeFormStep.APPROVE);
		}
	};

	const handleOnApproved = () => {
		setStep(UnstakeFormStep.CONFIRM);
	};

	/**
	 * Triggers the stake transaction with the amount stored in state
	 */
	const onStartTransaction = () => {
		(async () => {
			if (amountWei && poolInstance && deposit?.depositId !== undefined) {
				unstake(amountWei, deposit.depositId, poolInstance);
			}
		})();
	};

	const handleOnBack = () => {
		setStep(UnstakeFormStep.AMOUNT);
		setError(undefined);
	};

	return {
		amountWei,
		step,
		error,
		onConfirmAmount,
		onStartTransaction,
		deposit: deposit,
		isLoading: isLoadingDeposit,
		handleOnBack,
		handleOnApproved,
	};
};
