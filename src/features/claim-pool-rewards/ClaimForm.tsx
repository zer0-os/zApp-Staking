import { FC } from 'react';

import { PoolInfo } from '../../lib/types/pool';
import useClaimForm, { ClaimFormStep as Step } from './useClaimForm';

import { Confirm, Processing, WaitingForWallet } from './ClaimFormSteps';
import { FormInputs } from '../ui/FormInputs';

const ClaimForm: FC<PoolInfo> = (props) => {
	const { claimableAmount, step, onConfirmClaimAmount, onConfirmClaim } =
		useClaimForm(props.poolInstance);

	const { tokenTicker } = props.poolMetadata;

	let content;
	switch (step) {
		case Step.CONFIRM:
			content = (
				<Confirm
					onConfirm={onConfirmClaim}
					amount={claimableAmount}
					tokenTicker={tokenTicker}
				/>
			);
			break;
		case Step.WAITING_FOR_WALLET:
			content = (
				<WaitingForWallet amount={claimableAmount} tokenTicker={tokenTicker} />
			);
			break;
		case Step.COMPLETE:
		case Step.AMOUNT:
			content = (
				<FormInputs
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

	return <form>{content}</form>;
};

export default ClaimForm;
