import { FC } from 'react';

import { DepositData } from '../../lib/hooks/useAllDeposits';
import { formatTimestamp, formatWei } from '../../lib/util/format';

import { TableData } from '@zero-tech/zui/components/AsyncTable';

import { PoolDetail } from '../ui/PoolDetail';
import { DepositActions } from './DepositActions';

import styles from './DepositRow.module.scss';

interface DepositRowProps {
	rowData: DepositData;
}

export const DepositRow: FC<DepositRowProps> = ({ rowData }) => (
	<tr>
		<TableData alignment="left">
			<PoolDetail
				imageUrl={rowData.poolMetadata.icon}
				name={rowData.poolMetadata.name}
			/>
		</TableData>
		<TableData alignment="right" className={styles.Claimable}>
			<span>
				{rowData.lockedFrom
					? formatTimestamp(rowData.lockedUntil + '000')
					: '-'}
			</span>
			{rowData.isReward && <span>Staked Rewards</span>}
		</TableData>
		<TableData alignment="right">
			{formatWei(rowData.amount)} {rowData.poolMetadata.tokenTicker}
		</TableData>
		<TableData alignment="right">
			<DepositActions rowData={rowData} />
		</TableData>
	</tr>
);
