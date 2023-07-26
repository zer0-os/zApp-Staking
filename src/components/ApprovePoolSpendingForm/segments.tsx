import { FC } from 'react';
import { Wizard } from '@zero-tech/zui/components/Wizard';

const NEEDS_APPROVAL_MESSAGE =
	'Before you can stake in this pool, your wallet needs to approve pool spending. You will only need to do this once per pool. This will cost gas.';

const Header: FC<{ isApproving: boolean }> = ({ isApproving }) => (
	<Wizard.Header
		header={isApproving ? 'Approving...' : 'Approve Pool Spending'}
		sectionDivider={true}
	/>
);

const NeedsApproval: FC<{
	onContinue: () => Promise<void>;
	onCancel: () => void;
	error?: string;
}> = ({ onContinue, onCancel, error }) => (
	<Wizard.Confirmation
		message={NEEDS_APPROVAL_MESSAGE}
		error={error}
		primaryButtonText={'Continue'}
		isPrimaryButtonActive={true}
		onClickPrimaryButton={onContinue}
		secondaryButtonText={'Cancel'}
		isSecondaryButtonActive={true}
		onClickSecondaryButton={onCancel}
	/>
);

const WaitingForWallet = () => (
	<Wizard.Loading
		message={
			<>
				<p>{NEEDS_APPROVAL_MESSAGE}</p>
				<p>Please accept in your wallet...</p>
			</>
		}
	/>
);

const Checking = () => (
	<Wizard.Loading message={'Checking status of pool spending approval...'} />
);

const Approving = () => (
	<Wizard.Loading
		message={
			'Approving pool spending. This transaction must finish before you can continue to stake in this pool.'
		}
	/>
);

const Approved: FC<{ onComplete: () => void }> = ({ onComplete }) => (
	<Wizard.Confirmation
		message={'Pool spending is approved for your wallet.'}
		isPrimaryButtonActive={true}
		onClickPrimaryButton={onComplete}
	/>
);

export default {
	NeedsApproval,
	WaitingForWallet,
	Checking,
	Approving,
	Approved,
	Header,
};
