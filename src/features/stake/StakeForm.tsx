import { ViewPoolProps } from '../ui/ViewPool/ViewPool';
import { FC } from 'react';

import FormInputs from '../ui/FormInputs/FormInputs';
import useUserPoolTokenBalance from '../../lib/hooks/useUserPoolTokenBalance';
import ApprovePoolSpendingForm from '../ui/ApprovePoolSpendingForm/ApprovePoolSpendingForm';
import useWeb3 from '../../lib/hooks/useWeb3';
import useStakeForm, { StakeFormStep as Step } from './useStakeForm';
import Wizard from '@zero-tech/zui/components/Wizard';
import ConnectWallet from '../ui/ConnectWallet/ConnectWallet';

interface StakeFormProps extends ViewPoolProps {}

const StakeForm: FC<StakeFormProps> = (props) => {
	const { provider, account } = useWeb3();

	/**
	 * Get user pool token balance
	 */
	const { data: queryData, isLoading } = useUserPoolTokenBalance(
		account,
		props.poolInstance,
	);

	const { amount, step, onConfirmAmount, onStartTransaction, error } =
		useStakeForm(props.poolInstance);

	const onCancel = () => {
		// @TODO: implement cancel
		console.log('cancel');
	};

	// @TODO: show Connect Wallet modal

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
									text: `Successfully staked ${amount} ${props.poolMetadata.tokenTicker}`,
							  }
							: error && { text: error, isError: true }
					}
					onSubmit={onConfirmAmount}
					isTransactionPending={step !== Step.AMOUNT}
					balances={[
						{
							label: `Your Balance (${props.poolMetadata.tokenTicker})`,
							isLoading,
							value: queryData,
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
					provider={provider!}
					onCancel={onCancel}
					onComplete={onStartTransaction}
					/* Asserting not null because form validation
                     prevents us from getting this far if amount === undefined */
					amountToApprove={amount!}
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
