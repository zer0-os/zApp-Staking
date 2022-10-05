import { FC, useState } from 'react';

import { PoolInstance } from '@zero-tech/zfi-sdk';
import { BigNumber } from 'ethers';

import Segments from './segments';
import usePoolSpendingAllowance from './usePoolSpendingAllowance';
import useWeb3 from '../../../lib/hooks/useWeb3';
import { useTransaction } from '../../../lib/useTransaction';

enum Step {
	NEEDS_APPROVAL,
	WAITING_FOR_WALLET,
	APPROVING,
	APPROVED,
}

interface ApprovePoolSpendingFormProps {
	poolInstance: PoolInstance;
	onCancel: () => void;
	onComplete: () => void;
	amountToApprove: BigNumber;
}

export const ApprovePoolSpendingForm: FC<ApprovePoolSpendingFormProps> = ({
	poolInstance,
	onCancel,
	onComplete,
	amountToApprove,
}) => {
	const { account, provider } = useWeb3();
	const { executeTransaction } = useTransaction();

	/**
	 * Checks whether or not a user needs to approve a greater
	 * allowance to spend the amount they are attempting to spend.
	 */
	const { data: needsApproval, isLoading: isCheckingAllowance } =
		usePoolSpendingAllowance(amountToApprove, poolInstance);

	const [step, setStep] = useState<Step>(Step.NEEDS_APPROVAL);
	const [error, setError] = useState<string | undefined>();

	const approvePoolSpending = () => {
		return executeTransaction(poolInstance.approve, [provider.getSigner()], {
			onStart: () => setStep(Step.WAITING_FOR_WALLET),
			onProcessing: () => setStep(Step.APPROVING),
			onSuccess: () => setStep(Step.APPROVED),
			onError: (error) => {
				setError(error.message);
				setStep(Step.NEEDS_APPROVAL);
			},
			invalidationKeys: [
				['user', { account, poolAddress: poolInstance.address }],
			],
		});
	};

	/**
	 * If the user has sufficient allowance, call
	 * onComplete
	 */
	if (
		!isCheckingAllowance &&
		needsApproval === false &&
		step !== Step.APPROVED
	) {
		onComplete();
		setStep(Step.APPROVED);
	}

	if (isCheckingAllowance) {
		return (
			<>
				<Segments.Header isApproving={false} />
				<Segments.Checking />
			</>
		);
	}

	let content;
	switch (step) {
		case Step.WAITING_FOR_WALLET:
			content = <Segments.WaitingForWallet />;
			break;
		case Step.APPROVING:
			content = <Segments.Approving />;
			break;
		case Step.NEEDS_APPROVAL:
			content = (
				<Segments.NeedsApproval
					onContinue={approvePoolSpending}
					onCancel={onCancel}
					error={error}
				/>
			);
			break;
		default:
			content = <Segments.Approved onComplete={onComplete} />;
	}

	return (
		<>
			<Segments.Header isApproving={step === Step.APPROVING} />
			{content}
		</>
	);
};
