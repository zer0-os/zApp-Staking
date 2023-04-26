import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { COLUMNS } from './Deposits.helpers';
import { ROUTE_NAMES, ROUTES } from '../../lib/constants/routes';
import { useAllDeposits, DepositData } from '../../lib/hooks/useAllDeposits';

import { DepositRow } from './DepositRow';
import { DepositCard } from './DepositCard';
import { TableControls } from '../ui/TableControls';

import {
	Body,
	Grid,
	Header,
	HeaderGroup,
	Table,
	View,
} from '@zero-tech/zui/components/Table';

import styles from './DepositsTable.module.scss';

// @note: this value is being used in TableControls.module.scss - change in both places
const GRID_WIDTH_TOGGLE = 600;

export interface DepositsTableProps {
	/*
	 * Sending account as a string in case we need to show deposit
	 * tables of accounts other than the one currently connected
	 */
	account: string;
}

export const DepositsTable: FC<DepositsTableProps> = ({ account }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [view, setView] = useState<View>(View.TABLE);

	const { data: queryData, isLoading } = useAllDeposits({ account });

	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			if (containerRef.current) {
				if (containerRef.current.offsetWidth <= GRID_WIDTH_TOGGLE) {
					setView(View.GRID);
				}
			}
		});
		resizeObserver.observe(containerRef.current);
		return () => resizeObserver.disconnect();
	}, [containerRef]);

	return (
		<div className={styles.DepositsTable} ref={containerRef}>
			<TableControls view={view} onChangeView={setView} />
			<DepositsView
				depositsCollection={queryData?.deposits}
				isLoading={isLoading}
				isGridView={view === View.GRID}
			/>
		</div>
	);
};

/************************
 * DepositsView Row/Card  *
 ***********************/
interface DepositsViewProps {
	depositsCollection: DepositData[];
	isLoading: boolean;
	isGridView: boolean;
}

const DepositsView = ({
	depositsCollection,
	isLoading,
	isGridView,
}: DepositsViewProps) => {
	//  If loading, or there are already deposits loaded, render the table
	if (isLoading || Boolean(depositsCollection?.length)) {
		if (isGridView) {
			return (
				<div className={styles.DepositsView}>
					<Grid className={styles.Grid}>
						{depositsCollection?.map((deposit) => (
							<DepositCard deposit={deposit} isLoading={isLoading} />
						))}
					</Grid>
				</div>
			);
		} else {
			return (
				<div className={styles.DepositsView}>
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
