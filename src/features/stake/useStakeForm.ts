/**
 * @TODO: tests
 */

import { useState } from 'react';
import useWeb3 from '../../lib/hooks/useWeb3';
import { PoolInstance } from '@zero-tech/zfi-sdk';
import { BigNumber } from 'ethers';

export enum StakeFormStep {
	CONNECT_WALLET,
	AMOUNT,
	APPROVE,
	WAITING_FOR_WALLET,
	PROCESSING,
	COMPLETE,
}

const useStakeForm = (poolInstance: PoolInstance) => {
	const { provider, address } = useWeb3();

	const [amount, setAmount] = useState<number | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [step, setStep] = useState<StakeFormStep>(
		address === undefined || provider === undefined
			? StakeFormStep.CONNECT_WALLET
			: StakeFormStep.AMOUNT,
	);

	/**
	 * Sets the stake amount and moves onto the approval step.
	 * @param amount amount of tokens to check allowance and stake
	 */
	const onConfirmAmount = (amount: number) => {
		setError(undefined);
		/*
		 * Approval is handled by a different component.
		 * We just need to pass onApproved to that component.
		 */
		if (!isNaN(amount)) {
			setAmount(amount);
			setStep(StakeFormStep.APPROVE);
		}
	};

	/**
	 * Triggers the stake transaction with the amount stored in state
	 */
	const onStartTransaction = () => {
		const transaction = async () => {
			try {
				if (amount === undefined || amount === 0) {
					// @TODO better error
					throw new Error('Invalid amount - ' + amount);
				}
				setStep(StakeFormStep.WAITING_FOR_WALLET);
				const tx = await poolInstance.stake(
					amount.toString(),
					BigNumber.from(0),
					provider!.getSigner(),
				);
				setStep(StakeFormStep.PROCESSING);
				await tx.wait();
				setStep(StakeFormStep.COMPLETE);
			} catch (e: any) {
				setStep(StakeFormStep.AMOUNT);
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

export default useStakeForm;
