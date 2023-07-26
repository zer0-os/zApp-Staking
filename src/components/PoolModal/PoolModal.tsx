import { FC, ReactNode } from 'react';

import { BasicModalProps } from '@/lib/types/ui';

import { CloseButton, Modal } from '@zero-tech/zui/components/Modal';

import styles from './PoolModal.module.scss';

export interface PoolModalProps extends BasicModalProps {
	children: ReactNode;
}

export const PoolModal: FC<PoolModalProps> = ({ children, ...modalProps }) => (
	<Modal {...modalProps} className={styles.Modal}>
		<CloseButton
			onClick={() => modalProps.onOpenChange(false)}
			className={styles.CloseButton}
		/>
		{children}
	</Modal>
);
