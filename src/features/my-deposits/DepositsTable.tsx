import AsyncTable from '@zero-tech/zui/components/AsyncTable';
import useAllDeposits, { DepositData } from '../../lib/hooks/useAllDeposits';
import poolStyles from '../../pages/Pools.module.scss';
import styles from './DepositsTable.module.scss';
import Card from '@zero-tech/zui/components/Card';
import { COLUMNS } from './DepositsTable.constants';
import DepositRow from './DepositRow';
import { formatFiat } from '../../lib/util/format';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_NAMES, ROUTES } from '../../lib/constants/routes';

type DepositsTableProps = {
	account: string;
};

const DepositsTable: FC<DepositsTableProps> = ({ account }) => {
	const { data: queryData, isLoading, error } = useAllDeposits(account);

	return (
		<>
			<div className={poolStyles.Stats}>
				<Card
					title={'Your Total Stake'}
					value={{
						isLoading,
						text: '$' + formatFiat(queryData?.totalStaked),
					}}
				/>
				<Card
					title={'# Of Pools'}
					value={{ isLoading, text: queryData?.numPools.toLocaleString() }}
				/>
			</div>
			{!(!isLoading && (queryData.deposits.length === 0 || !queryData)) ? (
				<AsyncTable
					data={queryData?.deposits}
					itemKey="key"
					columns={COLUMNS}
					rowComponent={(data: DepositData) => <DepositRow rowData={data} />}
					gridComponent={(data: DepositData) => <></>}
					searchKey={{ key: 'key', name: 'message' }}
					isLoading={isLoading}
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

export default DepositsTable;
