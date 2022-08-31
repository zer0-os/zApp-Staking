import { FC } from 'react';

import useWeb3 from '../../../lib/hooks/useWeb3';
import usePoolData from '../../../lib/hooks/usePoolData';
import useUserPoolData from '../../../lib/hooks/useUserPoolData';
import { formatPercentage, formatWei } from '../../../lib/util/format';
import { PoolInfo } from '../../../lib/types/pool';

import { PoolDetail } from '../PoolDetail';
import { Card } from '@zero-tech/zui/components/Card';

import styles from './ViewPool.module.scss';

export interface ViewPoolProps extends PoolInfo {}

export const ViewPool: FC<ViewPoolProps> = ({ poolInstance, poolMetadata }) => {
	const { account } = useWeb3();

	const { data: poolQueryData, isLoading: isLoadingPoolData } =
		usePoolData(poolInstance);

	const { data: userQueryData, isLoading: isLoadingUserData } = useUserPoolData(
		poolInstance,
		account,
	);

	const aprAsString =
		poolQueryData?.apr && formatPercentage(poolQueryData?.apr);

	const rewardsClaimableAsString =
		userQueryData?.rewards && formatWei(userQueryData?.rewards);

	return (
		<>
			<PoolDetail name={poolMetadata.name} imageUrl={poolMetadata.icon} />
			<div className={styles.Cards}>
				{/* APR card */}
				<Card
					title={'APR'}
					value={{
						text: aprAsString,
						isLoading: isLoadingPoolData,
					}}
				/>

				{/* Rewards Claimable card */}
				<Card
					title={`Your Pool Rewards Claimable (${poolMetadata.tokenTicker})`}
					value={{
						text: rewardsClaimableAsString,
						isLoading: isLoadingUserData,
					}}
				/>
			</div>
		</>
	);
};
