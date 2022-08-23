import useWeb3 from './useWeb3';
import { useQuery } from 'react-query';
import { POOL_METADATA, PoolMetadata } from '../constants/pools';
import { useZfiSdk } from './useZfiSdk';
import { Deposit, PoolInstance, Reward, UserValue } from '@zero-tech/zfi-sdk';

export interface DepositData {
	key: string;
	depositId?: string;
	poolInstance: PoolInstance;
	poolMetadata: PoolMetadata;
	amount: string;
	lockedFrom?: string;
	lockedUntil?: string;
	/** Is the selected deposit is a reward, rather than a staked deposit? */
	isReward: boolean;
}

/**
 * Converts a Reward or Deposit into an easier to use data structure.
 */
const convertDeposit = (data: Reward | Deposit) => {
	var d;

	if ((data as Reward).for) {
		const reward = data as Reward;
		const timestamp = new Date(Number(reward.timestamp) * 1000);
		const unlock = (
			Number(
				new Date(timestamp.setFullYear(timestamp.getFullYear() + 1)).getTime(),
			) / 1000
		).toString();
		d = {
			lockedFrom: reward.timestamp,
			lockedUntil: unlock,
			isReward: true,
			key: reward.timestamp,
		};
	} else {
		const deposit = data as Deposit;
		d = {
			lockedFrom: deposit.lockedFrom !== '0' ? deposit.lockedFrom : undefined,
			lockedUntil:
				deposit.lockedUntil !== '0' ? deposit.lockedUntil : undefined,
			isReward: false,
			depositId: deposit.depositId,
			key: `${deposit.pool}-${deposit.depositId}`,
		};
	}
	return {
		...d,
		amount: data.tokenAmount,
	} as DepositData;
};

const useAllDeposits = (account: string) => {
	const zfiSdk = useZfiSdk();
	const { chainId } = useWeb3();

	return useQuery(`deposits-${account}-${chainId}`, async () => {
		const data = await Promise.all([
			zfiSdk.wildPool.getAllDeposits(account),
			zfiSdk.wildPool.getAllRewards(account),
			zfiSdk.liquidityPool.getAllDeposits(account),
			zfiSdk.liquidityPool.getAllRewards(account),
			zfiSdk.wildPool.userValueStaked(account),
			zfiSdk.liquidityPool.userValueStaked(account),
		]);

		const wildDeposits = data
			.slice(0, 2)
			.flat()
			.map((d) => convertDeposit(d as Deposit | Reward))
			.map((d) => ({
				...d,
				poolInstance: zfiSdk.wildPool,
				poolMetadata: POOL_METADATA.WILD_POOL,
			}));

		const lpDeposits = data
			.slice(2, 4)
			.flat()
			.map((d) => convertDeposit(d as Deposit | Reward))
			.map((d) => ({
				...d,
				poolInstance: zfiSdk.liquidityPool,
				poolMetadata: POOL_METADATA.LP_POOL,
			}));

		const deposits = [...wildDeposits, ...lpDeposits];

		const totalStaked = data.slice(4, 6).reduce((a, b) => {
			const pool = b as UserValue;
			return a + pool.userValueLockedUsd + pool.userValueUnlockedUsd;
		}, 0);

		return {
			deposits,
			numPools: [wildDeposits, lpDeposits].filter((a) => a.length !== 0).length,
			totalStaked,
		};
	});
};

export default useAllDeposits;
