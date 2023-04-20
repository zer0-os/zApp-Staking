import React from 'react';

import { PoolTable } from '../features/view-pools';
import { Card } from '@zero-tech/zui/components';

import { usePoolData } from '../lib/hooks/usePoolData';
import { formatFiat } from '../lib/util/format';
import { usePools } from '../lib/hooks/usePools';

import styles from './Pools.module.scss';

export const Pools = () => {
	const { wildPool, liquidityPool, numPools } = usePools();

	const { data: wildPoolData, isLoading: isLoadingWildPoolData } = usePoolData({
		poolAddress: wildPool.address,
	});
	const { data: lpPoolData, isLoading: isLoadingLpPoolData } = usePoolData({
		poolAddress: liquidityPool.address,
	});

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
				<Card
					label="TVL"
					primaryText={{
						isLoading: isLoadingWildPoolData || isLoadingLpPoolData,
						text: tvlString,
						errorText: '-',
					}}
				/>
				<Card label="# Of Pools" primaryText={numPools.toString()} />
			</div>
			<PoolTable />
		</>
	);
};
