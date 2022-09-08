import { Wizard } from '@zero-tech/zui/components/Wizard';
import { FC } from 'react';

interface ConfirmUnstakeProps {
	amountAsString: string;
	tokenTicker: string;
	onConfirm: () => void;
}

const ConfirmUnstake: FC<ConfirmUnstakeProps> = ({
	amountAsString,
	tokenTicker,
	onConfirm,
}) => {
	return (
		<Wizard.Confirmation
			message={
				<>
					<p>
						When you unstake this deposit, you will also claim your{' '}
						{tokenTicker} rewards from this pool. These rewards will be staked
						in the {tokenTicker} pool and can be unstaked after the 12 month
						vesting period.
					</p>
					<p>
						Are you sure you want to claim{' '}
						<b>
							{amountAsString} {tokenTicker}
						</b>{' '}
						in pool rewards and unstake{' '}
						<b>
							{amountAsString} {tokenTicker}
						</b>
						? This will happen in one transaction.
					</p>
				</>
			}
			onClickPrimaryButton={onConfirm}
			primaryButtonText={'Confirm Unstake'}
			isPrimaryButtonActive={true}
		/>
	);
};

export default ConfirmUnstake;
