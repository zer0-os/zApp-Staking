/*
 * Wraps the claim modal for easier use in other sibling components.
 */

import { FC } from 'react';

import { PoolInfo } from '../../lib/types/pool';
import { BasicModalProps } from '../../lib/types/ui';

import { ClaimForm } from './ClaimForm';
import { PoolModal } from '../ui/PoolModal/PoolModal';

export interface ClaimModalProps extends PoolInfo, BasicModalProps {}

export const ClaimModal: FC<ClaimModalProps> = ({
	poolInstance,
	poolMetadata,
	...modalProps
}) => (
	<PoolModal {...modalProps}>
		<ClaimForm poolInstance={poolInstance} poolMetadata={poolMetadata} />
	</PoolModal>
);
