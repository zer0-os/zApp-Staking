/*
 * Wraps the stake modal to be used in different contexts:
 * - Triggered by a button (pool table row)
 * - Triggered by a dropdown menu item (deposit table row)
 */

import { FC, ReactNode } from 'react';
import styles from './UnstakeModal.module.scss';
import Modal from '@zero-tech/zui/components/Modal';
import UnstakeForm, { UnstakeFormProps } from './UnstakeForm';

interface StakeModalProps extends UnstakeFormProps {
	open?: boolean;
	trigger?: string | ReactNode;
	onOpenChange?: (open: boolean) => void;
}

const StakeModal: FC<StakeModalProps> = ({
	open,
	trigger,
	onOpenChange,
	...rest
}) => (
	<Modal
		onOpenChange={onOpenChange}
		trigger={trigger}
		open={open}
		className={styles.Container}
	>
		<UnstakeForm {...rest} />
	</Modal>
);

export default StakeModal;
