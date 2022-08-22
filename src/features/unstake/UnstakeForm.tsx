import { ViewPoolProps } from '../ui/ViewPool/ViewPool';
import { FC } from 'react';

import FormInputs from '../ui/FormInputs/FormInputs';
import useWeb3 from '../../lib/hooks/useWeb3';
// import useStakeForm, { StakeFormStep as Step } from './useStakeForm';
import { Deposit } from '@zero-tech/zfi-sdk';
import useDeposit from '../../lib/hooks/useDeposit';
import { BigNumber } from 'ethers';
import useUnstakeForm, { UnstakeFormStep } from './useUnstakeForm';
import { Wizard } from '@zero-tech/zui/components';
import ConfirmUnstake from './ConfirmUnstake';

export interface UnstakeFormProps extends ViewPoolProps {
	depositId: Deposit['depositId'];
}

const UnstakeFormProps: FC<UnstakeFormProps> = ({
	poolMetadata,
	poolInstance,
	depositId,
}) => {
	const { account } = useWeb3();

	const { data: deposit, isLoading } = useDeposit(
		account,
		poolInstance,
		depositId,
	);

	const { amount, step, error, onConfirmAmount, onStartTransaction } =
		useUnstakeForm(poolInstance);

	const shouldShowHeader =
		step === UnstakeFormStep.CONFIRM ||
		step == UnstakeFormStep.WAITING_FOR_WALLET;

	let content;
	switch (step) {
		case UnstakeFormStep.AMOUNT:
		case UnstakeFormStep.PROCESSING:
			content = (
				<FormInputs
					action={'unstake'}
					onSubmit={onConfirmAmount}
					balances={[
						{
							label: `Amount Staked in This Deposit (${poolMetadata.tokenTicker})`,
							value: deposit ? BigNumber.from(deposit.tokenAmount) : undefined,
							isLoading,
						},
					]}
					poolMetadata={poolMetadata}
					poolInstance={poolInstance}
					isTransactionPending={step === UnstakeFormStep.PROCESSING}
				/>
			);
			break;
		case UnstakeFormStep.CONFIRM:
			content = (
				<ConfirmUnstake
					amount={amount}
					tokenTicker={poolMetadata.tokenTicker}
					onConfirm={() => onStartTransaction(depositId)}
				/>
			);
			break;
		default:
			content = <>huh?</>;
	}

	return (
		<form>
			<Wizard.Container header={shouldShowHeader && 'Unstake & Claim Rewards'}>
				{content}
			</Wizard.Container>
		</form>
	);
};

export default UnstakeFormProps;
