/**
 * @TODO: clean up hooks
 */

import { FC } from 'react';

import useStakeForm, { StakeFormStep as Step } from './useStakeForm';
import useUserPoolTokenBalance from '../../lib/hooks/useUserPoolTokenBalance';
import useWeb3 from '../../lib/hooks/useWeb3';
import { PoolInfo } from '../../lib/types/pool';

import { FormInputs } from '../ui/FormInputs';
import { ApprovePoolSpendingForm } from '../ui/ApprovePoolSpendingForm';
import { ConnectWallet } from '../ui/ConnectWallet';
import { Wizard } from '@zero-tech/zui/components/Wizard';
import { formatWei } from '../../lib/util/format';

interface StakeFormProps extends PoolInfo {}

const StakeForm: FC<StakeFormProps> = (props) => {
	const { account } = useWeb3();

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
									text: `${formatWei(amount, props.poolMetadata.tokenUnits)} ${
										props.poolMetadata.tokenTicker
									} staked successfully`,
									isError: false,
							  }
							: error && {
									text: 'Failed to process transaction.',
									isError: true,
							  }
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
					onCancel={onCancel}
					onComplete={onStartTransaction}
					amountToApprove={amount}
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
