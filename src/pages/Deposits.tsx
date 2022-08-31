import useWeb3 from '../lib/hooks/useWeb3';
import { formatFiat } from '../lib/util/format';
import useAllDeposits from '../lib/hooks/useAllDeposits';

import { Card } from '@zero-tech/zui/components/Card';
import { DepositsTable } from '../features/my-deposits';
import { ConnectWallet } from '../features/ui/ConnectWallet';

import poolStyles from './Pools.module.scss';

export const Deposits = () => {
	const { account } = useWeb3();
	const { data: queryData, isLoading } = useAllDeposits(account);

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
			{account ? (
				<DepositsTable account={account} />
			) : (
				<ConnectWallet
					message={'Connect a Web3 wallet to see your Staking data.'}
				/>
			)}
		</>
	);
};
