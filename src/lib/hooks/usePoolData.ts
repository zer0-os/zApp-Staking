import { PoolInstance } from '@zero-tech/zfi-sdk';
import { useQuery } from 'react-query';
import { getPoolData } from '../util/pool';

const usePoolData = (poolInstance: PoolInstance) => {
	return useQuery(`pool-${poolInstance.address}`, async () =>
		getPoolData(poolInstance),
	);
};

export default usePoolData;
