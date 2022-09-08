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
import { formatWei } from '../../lib/util/format';

export interface UnstakeFormProps extends PoolInfo {
	depositId: Deposit['depositId'];
	onComplete?: () => void;
}

const UnstakeFormProps: FC<UnstakeFormProps> = ({
	poolMetadata,
	poolInstance,
	depositId,
	onComplete,
}) => {
	const { account } = useWeb3();

	const { data: deposit, isLoading } = useDeposit(
		account,
		poolInstance,
		depositId,
	);

	const { amount, step, onConfirmAmount, onStartTransaction } =
		useUnstakeForm(poolInstance);

	const shouldShowHeader = [
		UnstakeFormStep.CONFIRM,
		UnstakeFormStep.PROCESSING,
		UnstakeFormStep.COMPLETE,
	].includes(step);

	let content;
	switch (step) {
		case UnstakeFormStep.AMOUNT:
		case UnstakeFormStep.WAITING_FOR_WALLET:
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
					isTransactionPending={step === UnstakeFormStep.WAITING_FOR_WALLET}
				/>
			);
			break;
		case UnstakeFormStep.CONFIRM:
			content = (
				<ConfirmUnstake
					amountAsString={formatWei(amount, poolMetadata.tokenUnits)}
					tokenTicker={poolMetadata.tokenTicker}
					onConfirm={() => onStartTransaction(depositId)}
				/>
			);
			break;
		case UnstakeFormStep.PROCESSING:
			content = (
				<Wizard.Loading message={'Your transaction is being processed...'} />
			);
			break;
		case UnstakeFormStep.COMPLETE:
			content = (
				<Wizard.Confirmation
					message={
						<>
							<b>
								{formatWei(amount, poolMetadata.tokenUnits)}{' '}
								{poolMetadata.tokenTicker}
							</b>{' '}
							unstaked successfully.
						</>
					}
					isPrimaryButtonActive={true}
					onClickPrimaryButton={onComplete}
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

export default UnstakeFormProps;
