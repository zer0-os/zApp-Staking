import { PoolInfo } from '../../lib/types/pool';
import { FC } from 'react';
import { StakeModal } from './StakeModal';

export const StakeButton: FC<PoolInfo> = ({ poolInstance, poolMetadata }) => (
	<StakeModal
		poolInstance={poolInstance}
		poolMetadata={poolMetadata}
		trigger={'Stake'}
	/>
);
