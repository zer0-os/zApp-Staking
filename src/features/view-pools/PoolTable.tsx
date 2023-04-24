import { FC, useEffect, useRef, useState } from 'react';

import { COLUMNS } from './Pools.helpers';
import { usePools } from '../../lib/hooks/usePools';

import { PoolRow } from './PoolRow';
import { PoolCard } from './PoolCard';
import { TableControls } from '../ui/TableControls';
import {
	Body,
	Grid,
	Header,
	HeaderGroup,
	Table,
	View,
} from '@zero-tech/zui/components/Table';

import styles from './PoolTable.module.scss';

// @note: this value is being used in TableControls.module.scss - change in both places
const GRID_WIDTH_TOGGLE = 600;

export const PoolTable: FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { wildPool, liquidityPool } = usePools();
	const tableData = [wildPool, liquidityPool];
	const [view, setView] = useState<View>(View.TABLE);

	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			if (containerRef.current) {
				if (containerRef.current.offsetWidth <= GRID_WIDTH_TOGGLE) {
					setView(View.GRID);
				}
			}
		});
		resizeObserver.observe(containerRef.current);
		return () => resizeObserver.disconnect();
	}, [containerRef]);

	return (
		<div ref={containerRef}>
			<TableControls view={view} onChangeView={setView} />
			<PoolView
				isGridView={view === View.GRID}
				poolAddressCollection={tableData.map(
					(poolAddressCollection) => poolAddressCollection.address,
				)}
			/>
		</div>
	);
};

/**********************
 * PoolView Row/Card  *
 *********************/
interface PoolViewProps {
	isGridView: boolean;
	poolAddressCollection: string[];
}

const PoolView = ({ isGridView, poolAddressCollection }: PoolViewProps) => {
	if (poolAddressCollection.length === 0) {
		return <></>;
	}
	if (isGridView) {
		return (
			<div className={styles.PoolView}>
				<Grid className={styles.Grid}>
					{poolAddressCollection?.map((poolAddress) => (
						<PoolCard key={`pool-${poolAddress}`} poolAddress={poolAddress} />
					))}
				</Grid>
			</div>
		);
	} else {
		return (
			<div className={styles.PoolView}>
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
								<PoolRow
									key={`pool-${poolAddress}`}
									poolAddress={poolAddress}
								/>
							))}
						</Body>
					</Table>
				</div>
			</div>
		);
	}
};
