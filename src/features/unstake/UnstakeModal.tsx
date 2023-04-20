/*
 * Wraps the claim modal for easier use in other sibling components.
 */

import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { Modal } from '@zero-tech/zui/components/Modal';
import UnstakeForm, { UnstakeFormProps } from './UnstakeForm';

import styles from './UnstakeModal.module.scss';

export interface UnstakeModalProps extends UnstakeFormProps, BasicModalProps {}

export const UnstakeModal: FC<UnstakeModalProps> = ({
	open,
	trigger,
	onOpenChange,
	...rest
}) => (
	<Modal
		onOpenChange={onOpenChange}
		trigger={trigger}
		open={open}
		className={styles.UnstakeModal}
	>
		<UnstakeForm {...rest} />
	</Modal>
);
