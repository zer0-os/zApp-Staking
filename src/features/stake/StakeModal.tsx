/*
 * Wraps the stake modal to be used in different contexts:
 * - Triggered by a button (pool table row)
 * - Triggered by a dropdown menu item (deposit table row)
 */

import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';
import { PoolInfo } from '../../lib/types/pool';

import StakeForm from './StakeForm';
import { PoolModal } from '../ui/PoolModal/PoolModal';

export interface StakeModalProps extends PoolInfo, BasicModalProps {}

export const StakeModal: FC<StakeModalProps> = ({
	poolInstance,
	poolMetadata,
	...modalProps
}) => (
	<PoolModal {...modalProps}>
		<StakeForm poolInstance={poolInstance} poolMetadata={poolMetadata} />
	</PoolModal>
);
