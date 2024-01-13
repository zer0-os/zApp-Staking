import { useLpPrice, useWildPrice } from '@/lib/hooks/usePoolData';
import { usePools } from '@/lib/hooks/usePools';

interface UsePoolTokenPriceParams {
	poolAddress: string;
}

export const usePoolTokenPrice = ({ poolAddress }: UsePoolTokenPriceParams) => {
	const pools = usePools();

	const wildPrice = useWildPrice();
	const lpPrice = useLpPrice();

	if (poolAddress === pools.wildPool.address) {
		return wildPrice;
	} else {
		return lpPrice;
	}
};
