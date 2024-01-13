import { Card } from '@zero-tech/zui/components';
import React from 'react';
import { usePools } from '@/lib/hooks/usePools';
import { usePoolData, useTokenPrices } from '@/lib/hooks/usePoolData';
import { ethers } from 'ethers';

export const GlobalTvlCard = () => {
	const { tvlString, isLoading } = useTvl();

	return (
		<Card
			label="TVL"
			primaryText={{
				isLoading,
				text: tvlString,
				errorText: '-',
			}}
		/>
	);
};

const useTvl = () => {
	const { wildPool, liquidityPool, numPools } = usePools();

	const { data: wildPoolData, isLoading: isLoadingWildPoolData } = usePoolData({
		poolAddress: wildPool.address,
	});

	const { data: lpPoolData, isLoading: isLoadingLpPoolData } = usePoolData({
		poolAddress: liquidityPool.address,
	});

	const lpTvl = useLpTvl();
	const wildTvl = useWildTvl();

	if (lpTvl.isLoading || wildTvl.isLoading) {
		return {
			isLoading: true,
			tvlString: '-',
		};
	}

	if (!lpTvl.tvl || !wildTvl.tvl) {
		return { isLoading: false, tvlString: 'Failed to load' };
	}

	return {
		isLoading: false,
		tvlString:
			'$' +
			(lpTvl.tvl + wildTvl.tvl).toLocaleString(undefined, {
				maximumFractionDigits: 2,
				minimumFractionDigits: 2,
			}),
	};
};

interface TvlHookReturn {
	isLoading: boolean;
	tvl?: number;
}

export const useLpTvl = (): TvlHookReturn => {
	const { liquidityPool } = usePools();

	const { data: lpPoolData, isLoading: isLoadingLpPoolData } = usePoolData({
		poolAddress: liquidityPool.address,
	});

	const { lpPrice, isLoadingLpPrice } = useTokenPrices();

	if (isLoadingLpPrice || isLoadingLpPoolData) {
		console.log('lp loading');
		return { isLoading: true, tvl: undefined };
	}

	if (!lpPoolData || lpPrice === undefined) {
		console.log('lp undefined');
		return { isLoading: false, tvl: undefined };
	}

	return {
		isLoading: false,
		tvl: Number(ethers.utils.formatEther(lpPoolData.tvl)) * lpPrice,
	};
};

export const useWildTvl = (): TvlHookReturn => {
	const { wildPool } = usePools();

	const { data: wildPoolData, isLoading: isLoadingWildPoolData } = usePoolData({
		poolAddress: wildPool.address,
	});

	const { wildPrice, isLoadingWildPrice } = useTokenPrices();

	if (isLoadingWildPrice || isLoadingWildPoolData) {
		return { isLoading: true, tvl: undefined };
	}

	if (!wildPoolData || wildPrice === undefined) {
		return { isLoading: false, tvl: undefined };
	}

	return {
		isLoading: false,
		tvl: Number(ethers.utils.formatEther(wildPoolData.tvl)) * wildPrice,
	};
};
