import { FC } from 'react';

import { COLUMNS } from './Pools.helpers';
import { usePools } from '../../lib/hooks/usePools';

import { PoolRow } from './PoolRow';
import { PoolCard } from './PoolCard';
import {
	Body,
	Grid,
	Header,
	HeaderGroup,
	Table,
} from '@zero-tech/zui/components/Table';

import styles from './PoolTable.module.scss';

export const PoolTable: FC = () => {
	const { wildPool, liquidityPool } = usePools();

	const tableData = [wildPool, liquidityPool];

	return (
		<PoolView
			poolAddressCollection={tableData.map(
				(poolAddressCollection) => poolAddressCollection.address,
			)}
		/>
	);
};

/**********************
 * PoolView Row/Card  *
 *********************/
interface PoolViewProps {
	poolAddressCollection: string[];
}

const PoolView = ({ poolAddressCollection }: PoolViewProps) => {
	if (poolAddressCollection.length === 0) {
		return <></>;
	}

	return (
		<div className={styles.PoolView}>
			<Grid className={styles.Grid}>
				{poolAddressCollection?.map((poolAddress) => (
					<PoolCard poolAddress={poolAddress} />
				))}
			</Grid>

			<div className={styles.Table}>
				<Table>
					<HeaderGroup>
						{COLUMNS.map((column) => (
							<Header key={column.id} alignment={column.alignment}>
								{column.header}
							</Header>
						))}
					</HeaderGroup>
					<Body>
						{poolAddressCollection?.map((poolAddress) => (
							<PoolRow poolAddress={poolAddress} />
						))}
					</Body>
				</Table>
			</div>
		</div>
	);
};
