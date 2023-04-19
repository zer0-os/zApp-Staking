import React from 'react';

import PoolRow from './PoolRow';
import { COLUMNS } from './Pools.helpers';

import { AsyncTable } from '@zero-tech/zui/components/AsyncTable';
import { usePools } from '../../lib/hooks/usePools';

export const PoolTable = () => {
	const { wildPool, liquidityPool } = usePools();

	const tableData = [wildPool, liquidityPool];

	return (
		<AsyncTable
			data={tableData}
			itemKey="address"
			columns={COLUMNS}
			rowComponent={(data) => <PoolRow poolAddress={data.address} />}
			gridComponent={() => <>UNHANDLED</>}
			isGridViewByDefault={false}
			showControls={false}
		/>
	);
};
