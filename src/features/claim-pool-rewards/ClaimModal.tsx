/*
 * Wraps the claim modal for easier use in other sibling components.
 */

import { FC } from 'react';

import { PoolInfo } from '../../lib/types/pool';
import { BasicModalProps } from '../../lib/types/ui';

import { ClaimForm } from './ClaimForm';
import { Modal } from '@zero-tech/zui/components/Modal';
import styles from './ClaimModal.module.scss';

export interface ClaimModalProps extends PoolInfo, BasicModalProps {}

export const ClaimModal: FC<ClaimModalProps> = ({
	poolInstance,
	poolMetadata,
	...modalProps
}) => (
	<Modal {...modalProps} className={styles.ClaimModal}>
		<ClaimForm poolInstance={poolInstance} poolMetadata={poolMetadata} />
	</Modal>
);
