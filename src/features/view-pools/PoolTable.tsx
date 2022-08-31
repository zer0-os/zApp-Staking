import { FC } from 'react';

import PoolRow from './PoolRow';
import { COLUMNS, PoolTableData } from './Pools.helpers';

import { AsyncTable } from '@zero-tech/zui/components/AsyncTable';

export interface PoolTableProps {
	data: PoolTableData[];
}

const PoolTable: FC<PoolTableProps> = ({ data }) => (
	<AsyncTable
		data={data}
		itemKey="address"
		columns={COLUMNS}
		rowComponent={(data) => <PoolRow rowData={data} />}
		// @TODO: handle grid component
		gridComponent={() => <>UNHANDLED</>}
		searchKey={{ key: 'address', name: 'message' }}
	/>
);

export default PoolTable;
