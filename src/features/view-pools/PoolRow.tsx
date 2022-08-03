import { FC } from 'react';
import Skeleton from 'zero-ui/src/components/Skeleton';

import styles from './PoolRow.module.scss';

import { PoolTableData } from './Pools.helpers';
import ViewPool from '../ui/ViewPool/ViewPool';
import PoolDetail from '../ui/PoolDetail/PoolDetail';
import { PoolData } from '../../lib/util/pool';
import usePoolData from '../../lib/hooks/usePoolData';
import StakeButton from '../stake/StakeButton';

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
				// @TODO: better formatting
				return Number(queryData.apr.toFixed(2)).toLocaleString() + '%';
			}
			if (key === 'tvl') {
				// @TODO: better formatting
				return (
					'$' +
					Number(queryData.tvl.valueOfTokensUSD.toFixed(2)).toLocaleString()
				);
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
