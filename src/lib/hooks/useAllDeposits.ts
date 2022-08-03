/**
 * Just wraps a react-query query in a custom hook
 * for cleaner ui.
 */

import { useQuery } from 'react-query';
import { POOL_METADATA, PoolMetadata } from '../constants/pools';
import { useZfiSdk } from './useZfiSdk';
import { Deposit, PoolInstance } from '@zero-tech/zfi-sdk';
import { BigNumber } from 'ethers';

export interface DepositData extends Deposit {
	poolInstance: PoolInstance;
	poolMetadata: PoolMetadata;
	key: string;
}

const useAllDeposits = (account: string) => {
	const zfiSdk = useZfiSdk();

	return useQuery(`deposits-${account}`, async () => {
		const data = await Promise.all([
			zfiSdk.wildPool.getAllDeposits(account),
			zfiSdk.liquidityPool.getAllDeposits(account),
			zfiSdk.wildPool.userValueStaked(account),
			zfiSdk.liquidityPool.userValueStaked(account),
		]);

		console.log(data[0], data[1], data[2], data[3]);

		const wildDeposits: DepositData[] = data[0].map((d) => ({
			...d,
			key: POOL_METADATA.WILD_POOL.name + d.depositId,
			poolInstance: zfiSdk.wildPool,
			poolMetadata: POOL_METADATA.WILD_POOL,
		}));
		const liquidityDeposits: DepositData[] = data[1].map((d) => ({
			...d,
			key: POOL_METADATA.LP_POOL.name + d.depositId,
			poolInstance: zfiSdk.liquidityPool,
			poolMetadata: POOL_METADATA.LP_POOL,
		}));

		const deposits = [...wildDeposits, ...liquidityDeposits];

		return {
			deposits,
			numPools: Number(wildDeposits.length) + Number(liquidityDeposits.length),
			totalStaked:
				(data[2]?.userValueLockedUsd ?? 0) +
				(data[2]?.userValueUnlockedUsd ?? 0) +
				(data[3]?.userValueLockedUsd ?? 0) +
				(data[3]?.userValueUnlockedUsd ?? 0),
		};
	});
};

export default useAllDeposits;
