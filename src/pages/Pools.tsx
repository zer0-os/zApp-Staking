import React from 'react';

import { PoolTable } from '@/features/view-pools';
import { GlobalTvlCard } from '@/features/global-tvl';
import { Card } from '@zero-tech/zui/components';

import styles from './Pools.module.scss';

export const Pools = () => {
	return (
		<>
			<div className={styles.Stats}>
				<GlobalTvlCard />
				<Card label="# Of Pools" primaryText={'2'} />
			</div>
			<PoolTable />
		</>
	);
};
