import { FC } from 'react';

import PoolRow from './PoolRow';
import { COLUMNS, PoolTableData } from './Pools.helpers';

import { AsyncTable } from '@zero-tech/zui/components/AsyncTable';

import styles from './PoolTable.module.scss';

export interface PoolTableProps {
	data: PoolTableData[];
}

export const PoolTable: FC<PoolTableProps> = ({ data }) => (
	<div className={styles.Wrapper}>
		<AsyncTable
			data={data}
			itemKey="address"
			columns={COLUMNS}
			rowComponent={(data) => <PoolRow rowData={data} />}
			// @TODO: handle grid component
			gridComponent={() => <>UNHANDLED</>}
			searchKey={{ key: 'address', name: 'message' }}
		/>
	</div>
);
