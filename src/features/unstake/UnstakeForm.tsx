import { FC } from 'react';

import useWeb3 from '../../lib/hooks/useWeb3';
import useDeposit from '../../lib/hooks/useDeposit';
import useUnstakeForm, { UnstakeFormStep } from './useUnstakeForm';
import { PoolInfo } from '../../lib/types/pool';
import { Deposit } from '@zero-tech/zfi-sdk';
import { BigNumber } from 'ethers';

import ConfirmUnstake from './ConfirmUnstake';
import { FormInputs } from '../ui/FormInputs';
import { Wizard } from '@zero-tech/zui/components';

export interface UnstakeFormProps extends PoolInfo {
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

	const { amount, step, onConfirmAmount, onStartTransaction } =
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
			// @TODO: handle
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
