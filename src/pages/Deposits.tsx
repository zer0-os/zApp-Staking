import React from 'react';

import { useWeb3 } from '@/lib/hooks/useWeb3';
import { formatFiat } from '@/lib/util/format';
import { useAllDeposits } from '@/lib/hooks/useAllDeposits';
import { useUserValueStaked } from '@/lib/hooks/useUserValueStaked';

import { Card } from '@zero-tech/zui/components/Card';
import { DepositsTable } from '@/features/my-deposits';
import { ConnectWallet } from '@/components/ConnectWallet';

import poolStyles from './Pools.module.scss';
import depositsStyles from './Deposits.module.scss';

export const Deposits = () => {
	const { account } = useWeb3();
	const { data: queryData, isLoading } = useAllDeposits({ account });
	const {
		data: userValue,
		isLoading: isLoadingUserValue,
		isIdle,
	} = useUserValueStaked({ account });

	return (
		<>
			<div className={poolStyles.Stats}>
				<Card
					label={'Your Total Stake'}
					primaryText={{
						isLoading: isLoadingUserValue || isIdle,
						text: userValue && '$' + formatFiat(userValue),
						errorText: '-',
					}}
				/>
				<Card
					label={'# Of Pools'}
					primaryText={{
						isLoading,
						text: queryData?.numPools.toLocaleString(),
						errorText: '-',
					}}
				/>
			</div>
			{account ? (
				<DepositsTable account={account} />
			) : (
				<div className={depositsStyles.ConnectWalletWrapper}>
					<ConnectWallet
						message={'Connect a Web3 wallet to see your Staking data.'}
					/>
				</div>
			)}
		</>
	);
};
