import { BigNumber } from 'ethers';
import { Deposit, PoolInstance } from '@zero-tech/zfi-sdk';

import { useWeb3 } from '../../lib/hooks/useWeb3';
import { TransactionOptions, useTransaction } from '../../lib/useTransaction';

export const useUnstake = ({ ...callbacks }: TransactionOptions) => {
	const { executeTransaction } = useTransaction();
	const { account, provider } = useWeb3();

	const unstake = (
		amountWei: BigNumber,
		depositId: Deposit['depositId'],
		poolInstance: PoolInstance,
	) => {
		(async () => {
			await executeTransaction(
				poolInstance.unstake,
				[depositId, amountWei.toString(), provider.getSigner()],
				{
					...callbacks,
					invalidationKeys: [
						['user', { account, poolAddress: poolInstance.address }],
					],
				},
			);
		})();
	};

	return { unstake };
};
