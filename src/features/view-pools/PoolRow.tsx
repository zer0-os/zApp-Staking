import { FC, useState } from 'react';

import { PoolData } from '@/lib/types/pool';
import { usePoolData } from '@/lib/hooks/usePoolData';
import { StakeModal } from '../stake';
import { formatPercentage, millifyNumber } from '@/lib/util/format';

import { Button, Skeleton } from '@zero-tech/zui/components';
import { TableData } from '@zero-tech/zui/components/AsyncTable';
import { PoolDetail } from '@/components/PoolDetail';

import styles from './PoolRow.module.scss';
import { usePoolByAddress } from '@/lib/hooks/usePoolByAddress';
import { useLpTvl, useWildTvl } from '@/features/global-tvl';

interface PoolRowProps {
	poolAddress: string;
}

export const PoolRow: FC<PoolRowProps> = ({ poolAddress }) => {
	const { pool } = usePoolByAddress({ poolAddress });
	const { data: queryData, isLoading, isError } = usePoolData({ poolAddress });
	const { tvl, isLoading: isLoadingTvl } = useTvl(poolAddress);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const getAsyncColumn = (key: keyof PoolData) => {
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
				return '$' + millifyNumber(tvl);
			}
		}
	};

	const onClickRow = () => {
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
			<tr className={styles.PoolRow} onClick={onClickRow}>
				<TableData alignment={'left'}>
					<PoolDetail imageUrl={pool.metadata.icon} name={pool.metadata.name} />
				</TableData>
				<TableData alignment={'right'}>{getAsyncColumn('apr')}</TableData>
				<TableData alignment={'right'}>{getAsyncColumn('tvl')}</TableData>
				<TableData className={styles.Last} alignment={'right'}>
					<Button className={styles.Action} onPress={onClickRow}>
						Stake
					</Button>
				</TableData>
			</tr>
		</>
	);
};

export const useTvl = (poolAddress: string) => {
	const lp = useLpTvl();
	const wild = useWildTvl();

	if (
		poolAddress.toLowerCase() ===
		'0x3aC551725ac98C5DCdeA197cEaaE7cDb8a71a2B4'.toLowerCase()
	) {
		return wild;
	} else {
		return lp;
	}
};
