import { Wizard } from '@zero-tech/zui/components/Wizard';
import { FC } from 'react';
import { formatBigNumberString, formatFiat } from '../../lib/util/format';
import { BigNumber } from 'ethers';
import { commify, formatEther } from 'ethers/lib/utils';

interface ConfirmUnstakeProps {
	amountWei: BigNumber;
	amountWeiReward: BigNumber;
	tokenTicker: string;
	onConfirm: () => void;
}

const ConfirmUnstake: FC<ConfirmUnstakeProps> = ({
	amountWei,
	amountWeiReward,
	tokenTicker,
	onConfirm,
}) => {
	const convertedAmount = commify(formatEther(amountWei));
	const convertedAmountReward = commify(formatEther(amountWeiReward));
	return (
		<Wizard.Confirmation
			message={
				<div>
					<p>
						When you unstake this deposit, you will also claim your{' '}
						{tokenTicker} rewards from this pool. These rewards will be staked
						in the {tokenTicker} pool and can be unstaked after the 12 month
						vesting period.
					</p>
					<p>
						Are you sure you want to claim{' '}
						<b>
							{convertedAmountReward} {tokenTicker}
						</b>{' '}
						in pool rewards and unstake{' '}
						<b>
							{convertedAmount} {tokenTicker}
						</b>
						? This will happen in one transaction.
					</p>
				</div>
			}
			onClickPrimaryButton={onConfirm}
			primaryButtonText={'Confirm Unstake'}
			isPrimaryButtonActive={true}
		/>
	);
};

export default ConfirmUnstake;
