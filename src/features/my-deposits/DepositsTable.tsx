import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAllDeposits, DepositData } from '../../lib/hooks/useAllDeposits';
import { ROUTE_NAMES, ROUTES } from '../../lib/constants/routes';

import { AsyncTable, Column } from '@zero-tech/zui/components/AsyncTable';
import { DepositRow } from './DepositRow';

import styles from './DepositsTable.module.scss';

/**
 * Columns to render in the DepositsTable
 */
export const COLUMNS: Column[] = [
	{ id: 'pool', header: 'Pool', alignment: 'left' },
	{ id: 'claimed', header: 'Date Claimable', alignment: 'right' },
	{ id: 'amount', header: 'Amount', alignment: 'right' },
	{ id: 'action', header: '', alignment: 'right' },
];

export interface DepositsTableProps {
	/*
	 * Sending account as a string in case we need to show deposit
	 * tables of accounts other than the one currently connected
	 */
	account: string;
}

export const DepositsTable: FC<DepositsTableProps> = ({ account }) => {
	const { data: queryData, isLoading } = useAllDeposits(account);

	return (
		<>
			{!(!isLoading && (!queryData || queryData.deposits.length === 0)) ? (
				<AsyncTable
					data={queryData?.deposits}
					itemKey="key"
					columns={COLUMNS}
					rowComponent={(data: DepositData) => <DepositRow rowData={data} />}
					isLoading={isLoading}
					showControls={false}
					isGridViewByDefault={false}
				/>
			) : (
				<p className={styles.Empty}>
					You have not staked in any pools. Get started on the{' '}
					<Link
						to={`/wilder/${ROUTES[ROUTE_NAMES.STAKING].slug}/${
							ROUTES[ROUTE_NAMES.POOLS].slug
						}`}
					>
						Pools Page
					</Link>
				</p>
			)}
		</>
	);
};
