import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { COLUMNS } from './Deposits.helpers';
import { ROUTE_NAMES, ROUTES } from '../../lib/constants/routes';
import { useAllDeposits, DepositData } from '../../lib/hooks/useAllDeposits';

import { DepositRow } from './DepositRow';

import {
	Body,
	Grid,
	Header,
	HeaderGroup,
	Table,
} from '@zero-tech/zui/components/Table';

import styles from './DepositsTable.module.scss';
import { DepositCard } from './DepositCard';
import { isError } from 'react-query';

export interface DepositsTableProps {
	/*
	 * Sending account as a string in case we need to show deposit
	 * tables of accounts other than the one currently connected
	 */
	account: string;
}

export const DepositsTable: FC<DepositsTableProps> = ({ account }) => {
	const { data: queryData, isLoading, isError } = useAllDeposits({ account });

	return (
		<DepositsView
			depositsCollection={queryData?.deposits}
			isLoading={isLoading}
		/>
	);
};

/************************
 * DepositsView Row/Card  *
 ***********************/
interface DepositsViewProps {
	depositsCollection: DepositData[];
	isLoading: boolean;
}

const DepositsView = ({ depositsCollection, isLoading }: DepositsViewProps) => {
	//  If loading, or there are already deposits loaded, render the table
	if (isLoading || Boolean(depositsCollection?.length)) {
		return (
			<div className={styles.DepositsView}>
				<Grid className={styles.Grid}>
					{depositsCollection?.map((deposit) => (
						<DepositCard deposit={deposit} isLoading={isLoading} />
					))}
				</Grid>

				<div className={styles.Table}>
					<Table>
						<HeaderGroup>
							{COLUMNS.map((column) => (
								<Header key={column.id} alignment={column.alignment}>
									{column.header}
								</Header>
							))}
						</HeaderGroup>
						<Body>
							{depositsCollection?.map((deposit) => (
								<DepositRow deposit={deposit} />
							))}
						</Body>
					</Table>
				</div>
			</div>
		);
	}

	// If loaded, and there are no deposits, render a message
	if (depositsCollection?.length === 0) {
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
