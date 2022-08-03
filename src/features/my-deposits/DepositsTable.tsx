import AsyncTable from 'zero-ui/src/components/AsyncTable';
import { useZfiSdk } from '../../lib/hooks/useZfiSdk';
import useAllDeposits, { DepositData } from '../../lib/hooks/useAllDeposits';
import { USER_ADDRESS } from '../../lib/constants/addresses';
import styles from '../../pages/Pools.module.scss';
import Card from 'zero-ui/src/components/Card';
import { COLUMNS } from './DepositsTable.constants';
import DepositRow from './DepositRow';

const DepositsTable = () => {
	const zfiSdk = useZfiSdk();

	const { data: queryData, isLoading, error } = useAllDeposits(USER_ADDRESS);

	return (
		<>
			<div className={styles.Stats}>
				<Card
					title={'Your Total Stake'}
					value={{
						isLoading,
						text: queryData?.totalStaked.toLocaleString(undefined, {
							style: 'currency',
							currency: 'USD',
						}),
					}}
				/>
				<Card
					title={'# Of Pools'}
					value={{ isLoading, text: queryData?.numPools.toLocaleString() }}
				/>
			</div>
			<AsyncTable
				data={queryData?.deposits}
				itemKey="key"
				columns={COLUMNS}
				rowComponent={(data: DepositData) => <DepositRow rowData={data} />}
				gridComponent={(data: DepositData) => <></>}
				searchKey={{ key: 'key', name: 'message' }}
				isLoading={isLoading}
			/>
		</>
	);
};

export default DepositsTable;
