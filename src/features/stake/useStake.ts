import { BigNumber } from 'ethers';
import { PoolInstance } from '@zero-tech/zfi-sdk';

import { useWeb3 } from '../../lib/hooks/useWeb3';
import { TransactionOptions, useTransaction } from '../../lib/useTransaction';

// Default lock time for now, until dynamic locking is implemented
const lockedUntil = BigNumber.from(0);

export const useStake = ({ ...callbacks }: TransactionOptions) => {
	const { executeTransaction } = useTransaction();
	const { account, provider } = useWeb3();

	const stake = (amountWei: BigNumber, poolInstance: PoolInstance) => {
		(async () => {
			await executeTransaction(
				poolInstance.stake,
				[amountWei.toString(), lockedUntil, provider.getSigner()],
				{
					...callbacks,
					invalidationKeys: [
						['user', { account, poolAddress: poolInstance.address }],
					],
				},
			);
		})();
	};

	return { stake };
};
