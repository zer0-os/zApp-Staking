import { FC, useState } from 'react';

import { PoolData } from '@/lib/types/pool';
import { usePoolData } from '@/lib/hooks/usePoolData';
import { usePoolByAddress } from '@/lib/hooks/usePoolByAddress';
import { formatPercentage, millifyNumber } from '@/lib/util/format';

import { StakeModal } from '../stake';
import { PoolDetail } from '@/components/PoolDetail';
import { Skeleton } from '@zero-tech/zui/components';
import { IconLinkExternal1 } from '@zero-tech/zui/icons';

import styles from './PoolCard.module.scss';

interface PoolCardProps {
	poolAddress: string;
}

export const PoolCard: FC<PoolCardProps> = ({ poolAddress }) => {
	const { pool } = usePoolByAddress({ poolAddress });
	const { data: queryData, isLoading, isError } = usePoolData({ poolAddress });

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const getAsyncData = (key: keyof PoolData) => {
		if (isLoading) {
			return <Skeleton width={'100%'} />;
		}
		if (isError) {
			return <>-</>;
		}
		if (queryData) {
			if (key === 'apr') {
				return formatPercentage(queryData.apr);
			}
			if (key === 'tvl') {
				return '$' + millifyNumber(queryData.tvl.valueOfTokensUSD);
			}
		}
	};

	const onClickCard = () => {
		setIsModalOpen(true);
	};

	return (
		<>
			<StakeModal
				poolInstance={pool.instance}
				poolMetadata={pool.metadata}
				open={isModalOpen}
				onOpenChange={(isOpen) => setIsModalOpen(isOpen)}
			/>
			<div className={styles.PoolCard} onClick={onClickCard}>
				<PoolDetail imageUrl={pool.metadata.icon} name={pool.metadata.name} />
				<div className={styles.CardBody}>
					<ul>
						<li key={'apr'}>
							<label>APR</label>
							<span>{getAsyncData('apr')}</span>
						</li>
						<li key={'tvl'}>
							<label>TVL</label>
							<span>{getAsyncData('tvl')}</span>
						</li>
					</ul>
				</div>
				<TextButton />
			</div>
		</>
	);
};

/**************
 * TextButton
 **************/

const TextButton = () => (
	<div className={styles.TextButton}>
		<p className={styles.Text}>{'Stake'}</p>
		<IconLinkExternal1 className={styles.Icon} size={'1rem'} isFilled />
	</div>
);
