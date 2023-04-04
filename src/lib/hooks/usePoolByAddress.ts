import { usePools } from './usePools';

interface UsePoolByAddressParams {
	poolAddress: string;
}

export const usePoolByAddress = ({ poolAddress }: UsePoolByAddressParams) => {
	const { wildPool, liquidityPool } = usePools();

	if (poolAddress === wildPool.address) {
		return { pool: wildPool };
	} else if (poolAddress === liquidityPool.address) {
		return { pool: liquidityPool };
	} else {
		console.error('Invalid pool address: ', poolAddress);
		return;
	}
};
