import { POOL_METADATA } from '../lib/constants/pools';
import { useZfiSdk } from '../lib/hooks/useZfiSdk';

import { Card } from '@zero-tech/zui/components/Card';
import { PoolTable } from '../features/view-pools';

import styles from './Pools.module.scss';

export const Pools = () => {
	const zfiSdk = useZfiSdk();

	const data = [
		{
			address: zfiSdk.wildPool.address,
			instance: zfiSdk.wildPool,
			metadata: POOL_METADATA.WILD_POOL,
		},
		{
			address: zfiSdk.liquidityPool.address,
			instance: zfiSdk.liquidityPool,
			metadata: POOL_METADATA.LP_POOL,
		},
	];

	return (
		<>
			<div className={styles.Stats}>
				<Card label="# Of Pools" primaryText={data.length.toString()} />
			</div>
			<PoolTable data={data} />
		</>
	);
};
