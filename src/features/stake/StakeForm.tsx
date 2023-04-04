/**
 * @TODO: clean up hooks
 */

import { FC } from 'react';

import { useStakeForm, StakeFormStep as Step } from './useStakeForm';
import { useUserPoolTokenBalance } from '../../lib/hooks/useUserPoolTokenBalance';
import { useWeb3 } from '../../lib/hooks/useWeb3';
import { PoolInfo } from '../../lib/types/pool';

import { FormInputs } from '../ui/FormInputs';
import { ApprovePoolSpendingForm } from '../ui/ApprovePoolSpendingForm';
import { ConnectWallet } from '../ui/ConnectWallet';
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
		<form>
			<Wizard.Container>{content}</Wizard.Container>
		</form>
	);
};

export default StakeForm;
