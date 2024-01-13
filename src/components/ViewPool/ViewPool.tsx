import { FC } from 'react';

import {
	useLpPrice,
	usePoolData,
	useTokenPrices,
	useWildPrice,
} from '@/lib/hooks/usePoolData';
import { formatFiat, formatPercentage } from '@/lib/util/format';
import { PoolInfo } from '@/lib/types/pool';
import { usePoolTokenPrice } from '@/lib/hooks/usePoolTokenPrice';

import { PoolDetail } from '../PoolDetail';
import { Card } from '@zero-tech/zui/components/Card';

import styles from './ViewPool.module.scss';
import { Alert } from '@zero-tech/zui/components';
import { useLpTvl } from '@/features/global-tvl';
import { usePools } from '@/lib/hooks/usePools';

export interface ViewPoolProps extends PoolInfo {}

export const ViewPool: FC<ViewPoolProps> = ({ poolInstance, poolMetadata }) => {
	const { data: poolQueryData, isLoading: isLoadingPoolData } = usePoolData({
		poolAddress: poolInstance.address,
	});

	const { data: price, isLoading: isLoadingPrice } = usePoolTokenPrice({
		poolAddress: poolInstance.address,
	});

	const aprAsString =
		poolQueryData?.apr && formatPercentage(poolQueryData?.apr);

	return (
		<>
			<PoolDetail name={poolMetadata.name} imageUrl={poolMetadata.icon} />
			{poolMetadata?.additionalInfo && (
				<Alert variant={'info'}>{poolMetadata.additionalInfo}</Alert>
			)}
			<div className={styles.Cards}>
				{/* APR card */}
				<Card
					label={'APR'}
					primaryText={{
						text: aprAsString,
						isLoading: isLoadingPoolData,
						errorText: '-',
					}}
				/>

				{/* Pool Token Price card */}
				<Card
					label={`${poolMetadata.tokenTicker} Token Price`}
					primaryText={{
						text: price ? `$${formatFiat(price)}` : '-',
						isLoading: isLoadingPrice,
						errorText: '-',
					}}
				/>
			</div>
		</>
	);
};
