import { FC } from 'react';
import Skeleton from '@zero-tech/zui/components/Skeleton';

import styles from './PoolRow.module.scss';

import { PoolTableData } from './Pools.helpers';
import { PoolDetail } from '../ui/PoolDetail';
import { PoolData } from '../../lib/types/pool';
import usePoolData from '../../lib/hooks/usePoolData';
import StakeButton from '../stake/StakeButton';
import { formatFiat, formatPercentage } from '../../lib/util/format';

interface PoolRowProps {
	rowData: PoolTableData;
}

const PoolRow: FC<PoolRowProps> = ({ rowData }) => {
	const { data: queryData, isLoading, isError } = usePoolData(rowData.instance);

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

	// @TODO: alignments based on Column data

	return (
		<tr>
			<td className={styles.Pool}>
				<PoolDetail
					imageUrl={rowData.metadata.icon}
					name={rowData.metadata.name}
				/>
			</td>
			<td className={styles.Right}>{getAsyncColumn('apr')}</td>
			<td className={styles.Right}>{getAsyncColumn('tvl')}</td>
			<td className={styles.Right}>
				<StakeButton
					poolInstance={rowData.instance}
					poolMetadata={rowData.metadata}
				/>
			</td>
		</tr>
	);
};

export default PoolRow;
