import { useQuery } from 'react-query';
import { PoolInstance } from '@zero-tech/zfi-sdk';
import { Deposit } from '@zero-tech/zfi-sdk';

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
