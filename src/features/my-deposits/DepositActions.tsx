import { FC, useState } from 'react';

import { DepositData } from '../../lib/hooks/useAllDeposits';

import { DropdownMenu } from '@zero-tech/zui/components/DropdownMenu';
import { StakeModal } from '../stake';
import { UnstakeModal } from '../unstake';
import { ClaimModal } from '../claim-pool-rewards';

interface DepositActionProps {
	rowData: DepositData;
}

/** All possible actions */
type Action = 'unstake' | 'claim' | 'stake';

/**
 * Wraps the shared functionality of the "..." button on Deposit rows and cards.
 */
export const DepositActions: FC<DepositActionProps> = ({ rowData }) => {
	// Destructure row data for easier use
	const { isReward, lockedUntil, poolInstance, poolMetadata, depositId } =
		rowData;

	const [action, setAction] = useState<Action | undefined>();

	/** List of deposit actions, i.e. "stake", "claim", "unstake" */
	const actions = [
		{
			id: 'claim',
			label: 'Claim Pool Rewards',
			onSelect: () => setAction('claim'),
		},
		{
			id: 'stake',
			label: 'Stake in Pool',
			onSelect: () => setAction('stake'),
		},
	];

	/**
	 * "Unstake" should only be an option for:
	 * 1) Non-reward deposits, i.e. deposits the user staked
	 * 2) Deposits (reward or non-reward) which have passed their unlock date.
	 */
	if (
		!isReward ||
		(lockedUntil && Number(lockedUntil) > new Date().getTime())
	) {
		actions.unshift({
			id: 'unstake',
			label: 'Unstake Deposit',
			onSelect: () => setAction('unstake'),
		});
	}

	return (
		<>
			<StakeModal
				poolInstance={poolInstance}
				poolMetadata={poolMetadata}
				open={action === 'stake'}
				onOpenChange={(open: boolean) => {
					if (!open) {
						setAction(undefined);
					}
				}}
			/>
			<ClaimModal
				open={action === 'claim'}
				poolInstance={poolInstance}
				poolMetadata={poolMetadata}
				onOpenChange={(open: boolean) => {
					if (!open) {
						setAction(undefined);
					}
				}}
			/>
			<UnstakeModal
				open={action === 'unstake'}
				poolInstance={poolInstance}
				poolMetadata={poolMetadata}
				depositId={depositId}
				onOpenChange={(open: boolean) => {
					if (!open) {
						setAction(undefined);
					}
				}}
			/>
			<DropdownMenu items={actions} alignMenu={'end'} />
		</>
	);
};
