import { FC } from 'react';
import { Wizard } from '@zero-tech/zui/components/Wizard';

interface ClaimTextProps {
	amount: number;
	tokenTicker: string;
}

export const ClaimText: FC<ClaimTextProps> = ({ amount, tokenTicker }) => (
	<div>
		<p>
			When you claim pool rewards, they are staked in the WILD pool and can be
			unstaked after a 12 month vesting period.
		</p>
		<p>
			Are you sure you want to claim{' '}
			<b>
				{amount} {tokenTicker}
			</b>{' '}
			in pool rewards?
		</p>
	</div>
);

interface ConfirmStepProps extends ClaimTextProps {
	onConfirm: () => void;
}

export const Confirm: FC<ConfirmStepProps> = ({ onConfirm, ...rest }) => (
	<>
		<Wizard.Header header={'Claim Pool Rewards'} />
		<Wizard.Confirmation
			onClickPrimaryButton={onConfirm}
			primaryButtonText={'Confirm Claim'}
			isPrimaryButtonActive={true}
			message={<ClaimText {...rest} />}
		/>
	</>
);

export const WaitingForWallet: FC<ClaimTextProps> = (props) => (
	<>
		<Wizard.Header header={'Claim Pool Rewards'} />
		<Wizard.Loading message={<ClaimText {...props} />} />
	</>
);

export const Processing = () => (
	<>
		<Wizard.Header header={'Processing Transaction'} />
		<Wizard.Loading message={'Your transaction is being processed...'} />
	</>
);
