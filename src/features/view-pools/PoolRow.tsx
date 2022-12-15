import { FC, useState } from 'react';
import { Skeleton } from '@zero-tech/zui/components/Skeleton';

import styles from './PoolRow.module.scss';

import { PoolTableData } from './Pools.helpers';
import { PoolDetail } from '../ui/PoolDetail';
import { PoolData } from '../../lib/types/pool';
import usePoolData from '../../lib/hooks/usePoolData';
import { StakeModal } from '../stake';
import { formatPercentage, millifyNumber } from '../../lib/util/format';
import { Button } from '@zero-tech/zui/components/Button';

import { TableData } from '@zero-tech/zui/components/AsyncTable';

interface PoolRowProps {
	rowData: PoolTableData;
}

const PoolRow: FC<PoolRowProps> = ({ rowData }) => {
	const { data: queryData, isLoading, isError } = usePoolData(rowData.instance);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const getAsyncColumn = (key: keyof PoolData) => {
		if (isLoading) {
			return <Skeleton width={'100%'} />;
		}
		if (isError) {
			return <>-</>;
		}
		if (queryData) {
			if (key === 'apr') {
				return formatPercentage(queryData.apr);
			}
			if (key === 'tvl') {
				return '$' + millifyNumber(queryData.tvl.valueOfTokensUSD);
			}
		}
	};

	const onClickRow = () => {
		setIsModalOpen(true);
	};

	return (
		<>
			<StakeModal
				poolInstance={rowData.instance}
				poolMetadata={rowData.metadata}
				open={isModalOpen}
				onOpenChange={(isOpen) => setIsModalOpen(isOpen)}
			/>
			<tr className={styles.Container} onClick={onClickRow}>
				<TableData alignment={'left'} className={styles.Pool}>
					<PoolDetail
						imageUrl={rowData.metadata.icon}
						name={rowData.metadata.name}
					/>
				</TableData>
				<TableData alignment={'right'}>{getAsyncColumn('apr')}</TableData>
				<TableData alignment={'right'}>{getAsyncColumn('tvl')}</TableData>
				<TableData className={styles.Last} alignment={'right'}>
					<Button className={styles.Action} onPress={onClickRow}>
						Stake
					</Button>
				</TableData>
			</tr>
		</>
	);
};

export default PoolRow;
