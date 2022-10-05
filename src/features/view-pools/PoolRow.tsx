import { FC, ReactNode, useState } from 'react';
import { Skeleton } from '@zero-tech/zui/components/Skeleton';

import styles from './PoolRow.module.scss';

import { PoolTableData } from './Pools.helpers';
import { PoolDetail } from '../ui/PoolDetail';
import { PoolData } from '../../lib/types/pool';
import usePoolData from '../../lib/hooks/usePoolData';
import { StakeModal } from '../stake';
import { formatFiat, formatPercentage } from '../../lib/util/format';
import { Button } from '@zero-tech/zui/components/Button';

interface PoolRowProps {
	rowData: PoolTableData;
}

const PoolRow: FC<PoolRowProps> = ({ rowData }) => {
	const { data: queryData, isLoading, isError } = usePoolData(rowData.instance);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const getAsyncColumn = (key: keyof PoolData) => {
		if (isLoading) {
			return <Skeleton width={100} />;
		}
		if (isError) {
			return <>ERR</>;
		}
		if (queryData) {
			if (key === 'apr') {
				return formatPercentage(queryData.apr);
			}
			if (key === 'tvl') {
				return '$' + formatFiat(queryData.tvl.valueOfTokensUSD);
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
				<td className={styles.Pool}>
					<PoolDetail
						imageUrl={rowData.metadata.icon}
						name={rowData.metadata.name}
					/>
				</td>
				<RightAlignedColumn content={getAsyncColumn('apr')} />
				<RightAlignedColumn content={getAsyncColumn('tvl')} />
				<RightAlignedColumn
					content={<Button onPress={onClickRow}>Stake</Button>}
				/>
			</tr>
		</>
	);
};

const RightAlignedColumn = ({ content }: { content: ReactNode }) => (
	<td className={styles.Right}>{content}</td>
);

export default PoolRow;
