import { useQuery } from 'react-query';
import { useZfiSdk } from './useZfiSdk';
import { useWeb3 } from './useWeb3';

interface UseUserValueStakedParams {
	account: string;
}

export const useUserValueStaked = ({ account }: UseUserValueStakedParams) => {
	const { chainId } = useWeb3();
	const { wildPool, liquidityPool } = useZfiSdk();

	return useQuery(
		['user', 'staked', { account, chainId }],
		async () => {
			const [wild, lp] = await Promise.all([
				wildPool.userValueStaked(account),
				liquidityPool.userValueStaked(account),
			]);

			const userValueLocked = wild.userValueLocked.add(lp.userValueLocked);
			const userValueUnlocked = wild.userValueUnlocked.add(
				lp.userValueUnlocked,
			);
			const userValueLockedUsd =
				wild.userValueLockedUsd + lp.userValueLockedUsd;
			const userValueUnlockedUsd =
				wild.userValueUnlockedUsd + lp.userValueUnlockedUsd;

			const userValueStaked = userValueLocked.add(userValueUnlocked);
			const userValueStakedUsd = userValueLockedUsd + userValueUnlockedUsd;

			return {
				userValueLocked,
				userValueUnlocked,
				userValueLockedUsd,
				userValueUnlockedUsd,
				userValueStaked,
				userValueStakedUsd,
			};
		},
		{
			enabled: Boolean(account),
			refetchOnWindowFocus: false,
		},
	);
};
