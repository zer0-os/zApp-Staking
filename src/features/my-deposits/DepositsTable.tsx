import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { useAllDeposits, DepositData } from '../../lib/hooks/useAllDeposits';
import { ROUTE_NAMES, ROUTES } from '../../lib/constants/routes';

import { AsyncTable, Column } from '@zero-tech/zui/components/AsyncTable';
import { DepositRow } from './DepositRow';

import styles from './DepositsTable.module.scss';

////////////////////
// Deposits Table //
////////////////////

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
	const { data: queryData, isLoading } = useAllDeposits({ account });

	// If loading, or there are already deposits loaded, render the table
	if (isLoading || Boolean(queryData?.deposits?.length)) {
		return (
			<AsyncTable
				data={queryData?.deposits}
				itemKey="key"
				columns={COLUMNS}
				rowComponent={(data: DepositData) => <DepositRow rowData={data} />}
				isLoading={isLoading}
				showControls={false}
				isGridViewByDefault={false}
			/>
		);
	}

	// If loaded, and there are no deposits, render a message
	if (queryData?.deposits?.length === 0) {
		return (
			<Message>
				You have not staked in any pools. Get started on the{' '}
				<Link
					to={`/wilder/${ROUTES[ROUTE_NAMES.STAKING].slug}/${
						ROUTES[ROUTE_NAMES.POOLS].slug
					}`}
				>
					Pools Page
				</Link>
			</Message>
		);
	}

	// Otherwise, render an error message
	return <Message>Failed to load your deposit data.</Message>;
};

/////////////
// Message //
/////////////

interface MessageProps {
	children: ReactNode;
}

const Message = ({ children }: MessageProps) => {
	return <p className={styles.Empty}>{children}</p>;
};
