/*
 * Wraps the stake modal to be used in different contexts:
 * - Triggered by a button (pool table row)
 * - Triggered by a dropdown menu item (deposit table row)
 */

import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';
import { PoolInfo } from '../../lib/types/pool';

import StakeForm from './StakeForm';
import { Modal } from '@zero-tech/zui/components/Modal';

import styles from './StakeModal.module.scss';

export interface StakeModalProps extends PoolInfo, BasicModalProps {}

export const StakeModal: FC<StakeModalProps> = ({
	poolInstance,
	poolMetadata,
	...modalProps
}) => (
	<Modal {...modalProps} className={styles.Container}>
		<StakeForm poolInstance={poolInstance} poolMetadata={poolMetadata} />
	</Modal>
);
