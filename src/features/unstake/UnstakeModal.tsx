/*
 * Wraps the claim modal for easier use in other sibling components.
 */

import { FC } from 'react';

import { BasicModalProps } from '@/lib/types/ui';

import UnstakeForm, { UnstakeFormProps } from './UnstakeForm';

import { PoolModal } from '@/components/PoolModal';

export interface UnstakeModalProps extends UnstakeFormProps, BasicModalProps {}

export const UnstakeModal: FC<UnstakeModalProps> = ({
	open,
	trigger,
	onOpenChange,
	...rest
}) => (
	<PoolModal open={open} trigger={trigger} onOpenChange={onOpenChange}>
		<UnstakeForm {...rest} />
	</PoolModal>
);
