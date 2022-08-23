import Wizard from '@zero-tech/zui/components/Wizard';
import { FC } from 'react';
import { formatFiat } from '../../lib/util/format';

interface ConfirmUnstakeProps {
	amount: number;
	tokenTicker: string;
	onConfirm: () => void;
}

const ConfirmUnstake: FC<ConfirmUnstakeProps> = ({
	amount,
	tokenTicker,
	onConfirm,
}) => {
	const convertedAmount = formatFiat(amount);
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
							{convertedAmount} {tokenTicker}
						</b>{' '}
						in pool rewards and unstake{' '}
						<b>
							{amount} {tokenTicker}
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
