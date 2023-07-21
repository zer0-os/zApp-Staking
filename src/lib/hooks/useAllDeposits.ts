import { useQuery } from 'react-query';
import { POOL_METADATA, PoolMetadata } from '../constants/pools';
import { useZfiSdk } from './useZfiSdk';
import { LegacyDeposit, PoolInstance } from '@zero-tech/zfi-sdk';
import { useWeb3 } from './useWeb3';
import { BigNumber } from 'ethers';

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

interface UseAllDepositsParams {
	account: string;
}

export const useAllDeposits = ({ account }: UseAllDepositsParams) => {
	const zfiSdk = useZfiSdk();
	const { chainId } = useWeb3();

	return useQuery(
		['user', 'deposits', { account, chainId }],
		async () => {
			const { wildPool, liquidityPool } = zfiSdk;

			const [wild, lp] = await Promise.all([
				getStakePoolData(wildPool, account),
				getStakePoolData(liquidityPool, account),
			]);

			const allDeposits = [
				...wild.deposits.map((d) =>
					convertDepositData(d, POOL_METADATA.WILD_POOL, wildPool),
				),
				...wild.rewards.map((r) =>
					convertRewardData(r, POOL_METADATA.WILD_POOL, wildPool),
				),
				...lp.deposits.map((d) =>
					convertDepositData(d, POOL_METADATA.LP_POOL, liquidityPool),
				),
				...lp.rewards.map((r) =>
					convertRewardData(r, POOL_METADATA.LP_POOL, liquidityPool),
				),
			];

			const numPools = Array.from(
				new Set(allDeposits.map((d) => d.poolInstance.address)),
			).length;

			return {
				deposits: allDeposits,
				numPools,
			};
		},
		{
			enabled: Boolean(account),
			refetchOnWindowFocus: false,
		},
	);
};

///////////////
// Utilities //
///////////////

/**
 * Gets relevant data from a stake pool for a given account.
 * @param poolInstance The stake pool instance to get data from.
 * @param account The account to get data for.
 */
const getStakePoolData = async (
	poolInstance: PoolInstance,
	account: string,
) => {
	const depositQuery = await poolInstance.getAllDepositsLegacy(account);

	return {
		deposits: depositQuery.filter((d) => !d.isYield),
		rewards: depositQuery.filter((d) => d.isYield),
	};
};

/**
 * Converts a deposit object from the SDK into a format that can be used by the UI more easily.
 * @param deposit The deposit object from the SDK.
 * @param poolMetadata The metadata for the pool that the deposit is in.
 * @param poolInstance The pool instance that the deposit is in.
 */
const convertDepositData = (
	deposit: LegacyDeposit,
	poolMetadata: PoolMetadata,
	poolInstance: PoolInstance,
): DepositData => {
	const zero = BigNumber.from('0');

	return {
		lockedFrom: deposit.lockedFrom.lte(zero)
			? undefined
			: deposit.lockedFrom.toString(),
		lockedUntil: deposit.lockedUntil.lte(zero)
			? undefined
			: deposit.lockedUntil.toString(),
		isReward: false,
		depositId: deposit.depositId.toString(),
		key: `deposit-${poolInstance.address}-${deposit.depositId}`,
		amount: deposit.tokenAmount.toString(),
		poolInstance,
		poolMetadata,
	};
};

/**
 * Converts a reward object from the SDK into a format that can be used by the UI more easily.
 * @param reward The reward object from the SDK.
 * @param poolMetadata The metadata for the pool that the reward is in.
 * @param poolInstance The pool instance that the reward is in.
 */
const convertRewardData = (
	reward: LegacyDeposit,
	poolMetadata: PoolMetadata,
	poolInstance: PoolInstance,
): DepositData => {
	return {
		lockedFrom: reward.lockedFrom?.toString(),
		lockedUntil: reward.lockedUntil?.toString(),
		isReward: true,
		key: `reward-${poolInstance.address}-${reward.depositId}`,
		amount: reward.tokenAmount.toString(),
		poolInstance,
		poolMetadata,
	};
};
