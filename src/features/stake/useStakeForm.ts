/**
 * @TODO: tests
 */

import { useState } from 'react';
import useWeb3 from '../../lib/hooks/useWeb3';
import { PoolInstance } from '@zero-tech/zfi-sdk';
import { BigNumber } from 'ethers';
import { useQueryClient } from 'react-query';

export enum StakeFormStep {
	CONNECT_WALLET,
	AMOUNT,
	APPROVE,
	WAITING_FOR_WALLET,
	PROCESSING,
	COMPLETE,
}

const useStakeForm = (poolInstance: PoolInstance) => {
	const { provider, account } = useWeb3();
	const queryClient = useQueryClient();

	const [amount, setAmount] = useState<BigNumber | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [step, setStep] = useState<StakeFormStep>(
		!account || !provider ? StakeFormStep.CONNECT_WALLET : StakeFormStep.AMOUNT,
	);

	/**
	 * Sets the stake amount and moves onto the approval step.
	 * @param amount amount of tokens to check allowance and stake
	 */
	const onConfirmAmount = (amount: BigNumber) => {
		setError(undefined);
		setAmount(amount);
		setStep(StakeFormStep.APPROVE);
	};

	/**
	 * Triggers the stake transaction with the amount stored in state
	 */
	const onStartTransaction = () => {
		(async () => {
			try {
				if (amount === undefined || amount.lte(0)) {
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
				await queryClient.invalidateQueries('balance');
				await queryClient.invalidateQueries('allowance');
				setStep(StakeFormStep.COMPLETE);
			} catch (e: any) {
				setStep(StakeFormStep.AMOUNT);
				setError(e.message ?? 'Transaction failed - please try again');
			}
		})();
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
