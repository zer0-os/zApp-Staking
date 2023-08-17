import { usePoolData } from '@/lib/hooks/usePoolData';

interface UsePoolTokenPriceParams {
	poolAddress: string;
}

export const usePoolTokenPrice = ({ poolAddress }: UsePoolTokenPriceParams) => {
	const { data: poolData, ...rest } = usePoolData({ poolAddress });

	let tokenPrice: number | undefined;

	if (poolData && poolData.tvl && poolData.tvl.numberOfTokens) {
		tokenPrice = poolData.tvl.valueOfTokensUSD / poolData.tvl.numberOfTokens;
	}

	return {
		data: tokenPrice,
		...rest,
	};
};
