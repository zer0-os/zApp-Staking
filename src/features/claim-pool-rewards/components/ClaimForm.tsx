import { FC } from 'react';

import { PoolInfo } from '@/lib/types/pool';
import { useClaimForm, ClaimFormStep as Step } from '../lib/useClaimForm';

import { Wizard } from '@zero-tech/zui/components/Wizard';

import { Confirm, Processing, WaitingForWallet } from './ClaimFormSteps';
import { FormInputs } from '@/components/FormInputs';

export const ClaimForm: FC<PoolInfo> = (props) => {
	const { amountWei, error, step, onConfirmClaimAmount, claim } = useClaimForm(
		props.poolInstance,
	);

	const { tokenTicker } = props.poolMetadata;

	const isHeaderHidden = step === Step.COMPLETE || step == Step.AMOUNT;

	let content;
	switch (step) {
		case Step.CONFIRM:
			content = (
				<Confirm
					onConfirm={claim}
					amountWei={amountWei}
					tokenTicker={tokenTicker}
				/>
			);
			break;
		case Step.WAITING_FOR_WALLET:
			content = (
				<WaitingForWallet amountWei={amountWei} tokenTicker={tokenTicker} />
			);
			break;
		case Step.COMPLETE:
		case Step.AMOUNT:
			content = (
				<FormInputs
					message={
						step === Step.COMPLETE
							? { text: 'Successfully claimed rewards!', isError: false }
							: error && { text: error, isError: true }
					}
					action={'claim'}
					{...props}
					onSubmit={onConfirmClaimAmount}
				/>
			);
			break;
		case Step.PROCESSING:
			content = <Processing />;
			break;
	}

	return (
		<form>
			<Wizard.Container>
				{!isHeaderHidden && <Wizard.Header header={'Claim Pool Rewards'} />}
				{content}
			</Wizard.Container>
		</form>
	);
};
