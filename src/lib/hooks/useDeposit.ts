import { PoolInstance } from '@zero-tech/zfi-sdk';
import { useQuery } from 'react-query';
import { getPoolData } from '../util/pool';
import { Deposit } from '@zero-tech/zfi-sdk';
import useWeb3 from './useWeb3';

const useDeposit = (
	account: string,
	poolInstance: PoolInstance,
	depositId: Deposit['depositId'],
) => {
	return useQuery(
		`deposit-${account}-${poolInstance.address}-${depositId}`,
		async () => {
			const deposits = await poolInstance.getAllDeposits(account);
			return deposits.filter((d) => d.depositId === depositId)[0];
		},
	);
};

export default useDeposit;
