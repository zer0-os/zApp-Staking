import { FC } from 'react';

import { useStakeForm, StakeFormStep as Step } from './useStakeForm';
import { PoolInfo } from '@/lib/types/pool';

import { FormInputs } from '@/components/FormInputs';
import { ApprovePoolSpendingForm } from '@/components/ApprovePoolSpendingForm';
import { ConnectWallet } from '@/components/ConnectWallet';
import { Wizard } from '@zero-tech/zui/components/Wizard';
import { commify, formatEther } from 'ethers/lib/utils';

interface StakeFormProps extends PoolInfo {}

const StakeForm: FC<StakeFormProps> = (props) => {
	const {
		amountWei,
		step,
		onConfirmAmount,
		onStartTransaction,
		error,
		userPoolTokenBalance,
		isLoadingUserPoolTokenBalance,
		isLoadingUserRewards,
		userRewardsClaimable,
	} = useStakeForm(props.poolInstance);

	const onCancel = () => {
		// @TODO: implement cancel
	};

	let content;
	switch (step) {
		case Step.CONNECT_WALLET:
			content = (
				<ConnectWallet message={'Connect your wallet to stake in this pool.'} />
			);
			break;
		case Step.COMPLETE:
		case Step.AMOUNT:
		case Step.WAITING_FOR_WALLET:
			content = (
				<FormInputs
					action={'stake'}
					{...props}
					message={
						step === Step.COMPLETE
							? {
									text: `Successfully staked ${commify(
										formatEther(amountWei),
									)} ${
										props.poolMetadata.tokenTicker
									}. This may take a few minutes to reflect in My Deposits, and may require a page refresh.`,
							  }
							: error && { text: error, isError: true }
					}
					onSubmit={onConfirmAmount}
					isTransactionPending={step !== Step.AMOUNT && step !== Step.COMPLETE}
					balances={[
						{
							label: `Your Balance (${props.poolMetadata.tokenTicker})`,
							isLoading: isLoadingUserPoolTokenBalance,
							value: userPoolTokenBalance,
						},
						{
							label: 'Your Claimable Rewards (WILD)',
							isLoading: isLoadingUserRewards,
							value: userRewardsClaimable,
						},
					]}
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
					poolInstance={props.poolInstance}
					onCancel={onCancel}
					onComplete={onStartTransaction}
					/* Asserting not null because form validation
                     prevents us from getting this far if amount === undefined */
					amountToApprove={amountWei!}
				/>
			);
	}

	return (
		<form data-testid={'zapp-staking-stake-form'}>
			<Wizard.Container>{content}</Wizard.Container>
		</form>
	);
};

export default StakeForm;
