import { FC } from 'react';

import { DepositData } from '@/lib/hooks/useAllDeposits';
import { formatTimestamp, formatWei } from '@/lib/util/format';

import { PoolDetail } from '@/components/PoolDetail';
import { DepositActions } from './DepositActions';
import { Skeleton } from '@zero-tech/zui/components';

import styles from './DepositCard.module.scss';

interface DepositCardProps {
	deposit: DepositData;
	isLoading: boolean;
}

export const DepositCard: FC<DepositCardProps> = ({ deposit, isLoading }) => {
	const dateClaimable = deposit?.lockedFrom
		? formatTimestamp(deposit.lockedUntil + '000')
		: '-';

	const depositAmount = deposit?.amount
		? `${formatWei(deposit.amount)} ${
				deposit.isReward ? 'WILD' : deposit.poolMetadata.tokenTicker
		  }`
		: '-';

	return (
		<>
			<div>
				<div className={styles.PoolDetailWrapper}>
					<PoolDetail
						imageUrl={deposit.poolMetadata.icon}
						name={deposit.poolMetadata.name}
					/>

					<DepositActions rowData={deposit} />
				</div>
				<div className={styles.CardBody}>
					<ul>
						<li key={'date-claimable'}>
							<label>Date Claimable</label>
							{isLoading && <Skeleton width={'100%'} />}
							<span>{dateClaimable}</span>
							{deposit?.isReward && <span>Staked Rewards</span>}
						</li>
						<li key={'amount'}>
							<label>Amount</label>
							{isLoading && <Skeleton width={'100%'} />}
							<span>{depositAmount}</span>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};
