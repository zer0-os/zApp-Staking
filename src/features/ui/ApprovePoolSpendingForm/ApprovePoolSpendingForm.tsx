import { FC, useState } from 'react';
import Segments from './segments';
import { PoolInstance } from '@zero-tech/zfi-sdk';
import { BigNumber, providers } from 'ethers';
import { useQuery } from 'react-query';
import usePoolSpendingAllowance from './usePoolSpendingAllowance';

enum Step {
	NEEDS_APPROVAL,
	WAITING_FOR_WALLET,
	APPROVING,
	APPROVED,
}

interface ApprovePoolSpendingFormProps {
	poolInstance: PoolInstance;
	provider: providers.Web3Provider;
	onCancel: () => void;
	onComplete: () => void;
	amountToApprove: number;
}

const ApprovePoolSpendingForm: FC<ApprovePoolSpendingFormProps> = ({
	poolInstance,
	provider,
	onCancel,
	onComplete,
	amountToApprove,
}) => {
	// @TODO: add an error step

	/**
	 * Checks whether or not a user needs to approve a greater
	 * allowance to spend the amount they are attempting to spend.
	 */
	const { data: needsApproval, isLoading: isCheckingAllowance } =
		usePoolSpendingAllowance(provider, amountToApprove, poolInstance);

	const [step, setStep] = useState<Step>(Step.NEEDS_APPROVAL);
	const [error, setError] = useState<string | undefined>();

	/**
	 * Steps the user through the process of approving
	 * pool spending.
	 */
	const approvePoolSpending = async () => {
		try {
			setError(undefined);
			setStep(Step.WAITING_FOR_WALLET);
			const tx = await poolInstance.approve(provider.getSigner());
			setStep(Step.APPROVING);
			await tx.wait();
			onComplete();
			setStep(Step.APPROVED);
		} catch (e) {
			console.error(e);
			setStep(Step.NEEDS_APPROVAL);
			setError('failed');
		}
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

export default ApprovePoolSpendingForm;
