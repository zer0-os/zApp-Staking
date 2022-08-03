/**
 * Just wraps a react-query query in a custom hook
 * for cleaner ui.
 */

import { PoolInstance } from '@zero-tech/zfi-sdk';
import { useQuery } from 'react-query';

const useUserPoolData = (poolInstance: PoolInstance, account: string) => {
	return useQuery(
		`user-pool-data-${poolInstance.address}-${account}`,
		async () => {
			const [deposits, rewards] = await Promise.all([
				poolInstance.getAllDeposits(account),
				poolInstance.pendingYieldRewards(account),
			]);
			return { deposits, rewards };
		},
	);
};

export default useUserPoolData;
