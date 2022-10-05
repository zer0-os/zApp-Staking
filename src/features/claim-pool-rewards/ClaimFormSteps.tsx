import { FC } from 'react';
import { Wizard } from '@zero-tech/zui/components/Wizard';
import { commify, formatEther } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

interface ClaimTextProps {
	amountWei: BigNumber;
	tokenTicker: string;
}

export const ClaimText: FC<ClaimTextProps> = ({ amountWei, tokenTicker }) => (
	<div>
		<p>
			When you claim pool rewards, they are staked in the WILD pool and can be
			unstaked after a 12 month vesting period.
		</p>
		<p>
			Are you sure you want to claim{' '}
			<b>
				{commify(formatEther(amountWei))} {tokenTicker}
			</b>{' '}
			in pool rewards?
		</p>
	</div>
);

interface ConfirmStepProps extends ClaimTextProps {
	onConfirm: () => void;
}

export const Confirm: FC<ConfirmStepProps> = ({ onConfirm, ...rest }) => (
	<Wizard.Confirmation
		onClickPrimaryButton={onConfirm}
		primaryButtonText={'Confirm Claim'}
		isPrimaryButtonActive={true}
		message={<ClaimText {...rest} />}
	/>
);

export const WaitingForWallet: FC<ClaimTextProps> = (props) => (
	<Wizard.Loading message={<ClaimText {...props} />} />
);

export const Processing = () => (
	<Wizard.Loading message={'Your transaction is being processed...'} />
);
