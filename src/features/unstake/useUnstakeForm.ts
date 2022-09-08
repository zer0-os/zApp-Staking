/**
 * @TODO: tests
 */

import { useState } from 'react';
import useWeb3 from '../../lib/hooks/useWeb3';
import { Deposit, PoolInstance } from '@zero-tech/zfi-sdk';
import { BigNumber } from 'ethers';
import { useQueryClient } from 'react-query';

export enum UnstakeFormStep {
	AMOUNT,
	CONFIRM,
	WAITING_FOR_WALLET,
	PROCESSING,
	COMPLETE,
}

const useUnstakeForm = (poolInstance: PoolInstance) => {
	const { provider } = useWeb3();
	const queryClient = useQueryClient();

	const [amount, setAmount] = useState<BigNumber | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [step, setStep] = useState<UnstakeFormStep>(UnstakeFormStep.AMOUNT);

	/**
	 * Sets the stake amount and moves onto the approval step.
	 * @param amount amount of tokens to check allowance and stake
	 */
	const onConfirmAmount = (amount: BigNumber) => {
		setError(undefined);
		setAmount(amount);
		setStep(UnstakeFormStep.CONFIRM);
	};

	/**
	 * Triggers the stake transaction with the amount stored in state
	 */
	const onStartTransaction = (depositId: Deposit['depositId']) => {
		const transaction = async () => {
			try {
				if (amount === undefined || amount.lte(0)) {
					// @TODO better error
					throw new Error('Invalid amount - ' + amount);
				}
				setStep(UnstakeFormStep.WAITING_FOR_WALLET);
				const tx = await poolInstance.unstake(
					depositId,
					amount.toString(),
					provider.getSigner(),
				);
				setStep(UnstakeFormStep.PROCESSING);
				await tx.wait();
				setStep(UnstakeFormStep.COMPLETE);
				await queryClient.invalidateQueries('balance');
				await queryClient.invalidateQueries('allowance');
			} catch (e: any) {
				setStep(UnstakeFormStep.AMOUNT);
				setError(e.message ?? 'Transaction failed - please try again');
			}
		};
		transaction();
	};

	return {
		amount,
		step,
		error,
		onConfirmAmount,
		onStartTransaction,
	};
};

export default useUnstakeForm;
