import { FC } from 'react';

import { DepositData } from '../../lib/hooks/useAllDeposits';
import { formatTimestamp, formatWei } from '../../lib/util/format';

import { TableData } from '@zero-tech/zui/components/AsyncTable';

import { PoolDetail } from '../ui/PoolDetail';
import { DepositActions } from './DepositActions';

import styles from './DepositRow.module.scss';

interface DepositRowProps {
	deposit: DepositData;
}

export const DepositRow: FC<DepositRowProps> = ({ deposit }) => (
	<tr>
		<TableData alignment="left">
			<PoolDetail
				imageUrl={deposit.poolMetadata.icon}
				name={deposit.poolMetadata.name}
			/>
		</TableData>
		<TableData alignment="right" className={styles.Claimable}>
			<span>
				{deposit.lockedFrom
					? formatTimestamp(deposit.lockedUntil + '000')
					: '-'}
			</span>
			{deposit.isReward && <span>Staked Rewards</span>}
		</TableData>
		<TableData alignment="right">
			{formatWei(deposit.amount)} {deposit.poolMetadata.tokenTicker}
		</TableData>
		<TableData alignment="right">
			<DepositActions rowData={deposit} />
		</TableData>
	</tr>
);
