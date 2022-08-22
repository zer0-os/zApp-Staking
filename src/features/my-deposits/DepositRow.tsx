import { FC } from 'react';
import Skeleton from '@zero-tech/zui/components/Skeleton';
import { DepositData } from '../../lib/hooks/useAllDeposits';
import PoolDetail from '../ui/PoolDetail/PoolDetail';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

import DropdownMenu from '@zero-tech/zui/components/DropdownMenu';

import styles from './DepositRow.module.scss';
import StakeForm from '../stake/StakeForm';
import StakeButton from '../stake/StakeButton';
import useDepositData from './useDepositData';
import DepositActions from './DepositActions';
import { formatTimestamp, formatWei } from '../../lib/util/format';
import classNames from 'classnames';

interface DepositRowProps {
	rowData: DepositData;
}

/**
 * Converts a BigNumber timestamp to
 * a readable date string (mm/dd/yyyy)
 * Returns "-" for timestamp 0
 * @param timestamp timestamp to convert
 */
const convertTimestamp = (timestamp: BigNumber) => {
	return timestamp.toNumber()
		? new Date(timestamp.toNumber() * 1000).toLocaleString().split(',')[0]
		: '-';
};

const DepositRow: FC<DepositRowProps> = ({ rowData }) => {
	return (
		<>
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
		</>
	);
};

export default DepositRow;
