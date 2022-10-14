import { POOL_METADATA } from '../lib/constants/pools';
import { useZfiSdk } from '../lib/hooks/useZfiSdk';

import { Card } from '@zero-tech/zui/components/Card';
import { PoolTable } from '../features/view-pools';

import styles from './Pools.module.scss';
import usePoolData from '../lib/hooks/usePoolData';
import { formatFiat } from '../lib/util/format';

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

	const { data: wildPoolData, isLoading: isLoadingWildPoolData } = usePoolData(
		data[0].instance,
	);
	const { data: lpPoolData, isLoading: isLoadingLpPoolData } = usePoolData(
		data[1].instance,
	);

	const tvlString =
		wildPoolData && lpPoolData
			? '$' +
			  formatFiat(
					(wildPoolData.tvl.valueOfTokensUSD ?? 0) +
						(lpPoolData.tvl.valueOfTokensUSD ?? 0),
			  )
			: undefined;

	return (
		<>
			<div className={styles.Stats}>
				<Card label="# Of Pools" primaryText={data.length.toString()} />
				<Card
					label="TVL"
					primaryText={{
						isLoading: isLoadingWildPoolData || isLoadingLpPoolData,
						text: tvlString,
					}}
				/>
			</div>
			<PoolTable data={data} />
		</>
	);
};
