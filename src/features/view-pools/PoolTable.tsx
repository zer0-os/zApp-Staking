import { FC } from 'react';

import PoolRow from './PoolRow';
import { COLUMNS, PoolTableData } from './Pools.helpers';

import { AsyncTable } from '@zero-tech/zui/components/AsyncTable';

export interface PoolTableProps {
	data: PoolTableData[];
}

export const PoolTable: FC<PoolTableProps> = ({ data }) => (
	<AsyncTable
		data={data}
		itemKey="address"
		columns={COLUMNS}
		rowComponent={(data) => <PoolRow rowData={data} />}
		gridComponent={() => <>UNHANDLED</>}
		isGridViewByDefault={false}
		showControls={false}
	/>
);
