import { FC } from 'react';
import { UnstakeFormStep as Step, useUnstakeForm } from './useUnstakeForm';
import { PoolInfo } from '@/lib/types/pool';
import { Deposit } from '@zero-tech/zfi-sdk';
import { BigNumber } from 'ethers';

import ConfirmUnstake from './ConfirmUnstake';
import { FormInputs } from '@/components/FormInputs';
import { Wizard } from '@zero-tech/zui/components';
import { ApprovePoolSpendingForm } from '@/components/ApprovePoolSpendingForm';
import { commify, formatEther } from 'ethers/lib/utils';

export interface UnstakeFormProps extends PoolInfo {
	depositId: Deposit['depositId'];
	onFinish: () => void;
}

const UnstakeForm: FC<UnstakeFormProps> = ({
	poolMetadata,
	poolInstance,
	depositId,
	onFinish,
}) => {
	const {
		amountWei,
		amountWeiReward,
		deposit,
		isLoading,
		error,
		step,
		onConfirmAmount,
		onStartTransaction,
		handleOnBack,
		handleOnApproved,
	} = useUnstakeForm({
		poolInstance,
		depositId,
	});

	const shouldShowHeader =
		step === Step.CONFIRM || step == Step.PROCESSING || step === Step.COMPLETE;

	let content;
	switch (step) {
		case Step.AMOUNT:
		case Step.WAITING_FOR_WALLET:
			content = (
				<FormInputs
					action={'unstake'}
					onSubmit={onConfirmAmount}
					message={error && { text: error, isError: true }}
					balances={[
						{
							label: `Amount Staked in This Deposit (${poolMetadata.tokenTicker})`,
							value: deposit ? BigNumber.from(deposit.amount) : undefined,
							isLoading,
						},
					]}
					poolMetadata={poolMetadata}
					poolInstance={poolInstance}
					isTransactionPending={step == Step.WAITING_FOR_WALLET}
				/>
			);
			break;
		case Step.PROCESSING:
			content = (
				<Wizard.Loading message={'Your transaction is being processed...'} />
			);
			break;
		case Step.APPROVE:
			content = (
				<ApprovePoolSpendingForm
					poolInstance={poolInstance}
					onCancel={handleOnBack}
					onComplete={handleOnApproved}
					/* Asserting not null because form validation
                     prevents us from getting this far if amount === undefined */
					amountToApprove={amountWei!}
				/>
			);
			break;
		case Step.CONFIRM:
			content = (
				<ConfirmUnstake
					amountWei={amountWei}
					amountWeiReward={amountWeiReward}
					tokenTicker={poolMetadata.tokenTicker}
					onConfirm={onStartTransaction}
				/>
			);
			break;
		case Step.COMPLETE:
			content = (
				<Wizard.Confirmation
					message={
						<>
							<p>
								You have successfully unstaked{' '}
								<b>
									{commify(formatEther(amountWei))} {poolMetadata.tokenTicker}
								</b>
								!
							</p>
							<p>
								This may take a few minutes to reflect in My Deposits, and may
								require a page refresh.
							</p>
						</>
					}
					isPrimaryButtonActive={true}
					primaryButtonText={'Finish'}
					onClickPrimaryButton={onFinish}
				/>
			);
	}

	return (
		<form>
			<Wizard.Container header={shouldShowHeader && 'Unstake & Claim Rewards'}>
				{content}
			</Wizard.Container>
		</form>
	);
};

export default UnstakeForm;
