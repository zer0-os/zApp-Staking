import PoolTable from '../features/view-pools/PoolTable';
import { PoolTableData } from '../features/view-pools/Pools.helpers';
import { POOL_METADATA } from '../lib/constants/pools';
import { useZfiSdk } from '../lib/hooks/useZfiSdk';

import Card from 'zero-ui/src/components/Card';

import styles from './Pools.module.scss';

const Pools = () => {
	const zfiSdk = useZfiSdk();

	const data: PoolTableData[] = [
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

	// Stats for the top: number of pools, total amount staked

	return (
		<>
			<div className={styles.Stats}>
				<Card title={'Total Amount Staked'} value={{ isLoading: true }} />
				<Card title={'# Of Pools'} value={data.length} />
			</div>
			<PoolTable data={data} />
		</>
	);
};

export default Pools;
