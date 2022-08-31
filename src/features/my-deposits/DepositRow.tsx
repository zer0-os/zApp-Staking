import { FC } from 'react';

import { DepositData } from '../../lib/hooks/useAllDeposits';
import { formatTimestamp, formatWei } from '../../lib/util/format';

import { PoolDetail } from '../ui/PoolDetail';
import { DepositActions } from './DepositActions';
import classNames from 'classnames';

import styles from './DepositRow.module.scss';

interface DepositRowProps {
	rowData: DepositData;
}

export const DepositRow: FC<DepositRowProps> = ({ rowData }) => (
	<tr>
		<td>
			<PoolDetail
				imageUrl={rowData.poolMetadata.icon}
				name={rowData.poolMetadata.name}
			/>
		</td>
		<td className={classNames(styles.Right, styles.Claimable)}>
			<span>
				{rowData.lockedFrom
					? formatTimestamp(rowData.lockedUntil + '000')
					: '-'}
			</span>
			{rowData.isReward && <span>Staked Rewards</span>}
		</td>
		<td className={styles.Right}>
			{formatWei(rowData.amount)} {rowData.poolMetadata.tokenTicker}
		</td>
		<td className={styles.Right}>
			<DepositActions rowData={rowData} />
		</td>
	</tr>
);
