import { useQuery } from 'react-query';
import { getPoolData } from '../util/pool';
import { usePoolByAddress } from './usePoolByAddress';
import { corePoolContract } from '@/lib/contracts/core-pool';
import { useWeb3 } from '@/lib/hooks/useWeb3';
import { ethers } from 'ethers';
import { getLpToken } from '@zero-tech/zfi-sdk/lib/actions/helpers';
import { lpTokenContract } from '@/lib/contracts/lp-token';
import { wethTokenContract } from '@/lib/contracts/weth-token';
import { wildTokenContract } from '@/lib/contracts/wild-token';

interface UsePoolDataParams {
	poolAddress: string;
}

export const usePoolData = ({ poolAddress }: UsePoolDataParams) => {
	const { provider } = useWeb3();
	const { pool } = usePoolByAddress({ poolAddress });

	return useQuery(
		['staking', 'pool', { poolAddress }],
		async () => {
			const poolContract = corePoolContract(poolAddress, provider);
			const [tvl, apr] = await Promise.all([
				poolContract.poolTokenReserve(),
				pool.instance.poolApr(),
			]);
			return {
				apr,
				tvl,
			};
		},
		{
			refetchOnWindowFocus: false,
			enabled: Boolean(pool),
		},
	);
};

export const useTokenPrices = () => {
	const { data: wildPrice, isLoading: isLoadingWildPrice } = useWildPrice();
	const { data: lpPrice, isLoading: isLoadingLpPrice } = useLpPrice();

	return {
		wildPrice,
		isLoadingWildPrice,
		lpPrice,
		isLoadingLpPrice,
	};
};

export const useWildPrice = () => {
	return useQuery(['price', 'wild'], async () => {
		const res = await fetch(
			'https://token-price.brett-b26.workers.dev?slug=wilder-world',
		);
		const body = await res.json();
		return body.data['9674'].quote.USD.price;
	});
};

export const useLpPrice = () => {
	const { data: wildPrice, isLoading: isLoadingWildPrice } = useWildPrice();
	const { provider } = useWeb3();

	return useQuery(
		['price', 'lp'],
		async () => {
			const lpContract = lpTokenContract(provider);
			const wethContract = wethTokenContract(provider);
			const wildContract = wildTokenContract(provider);

			const [ethPrice, wildBalance, wethBalance, lpTokenTotalSupply] =
				await Promise.all([
					getEthPrice(),
					wildContract.balanceOf(lpContract.address) as ethers.BigNumber,
					wethContract.balanceOf(lpContract.address) as ethers.BigNumber,
					lpContract.totalSupply() as ethers.BigNumber,
				]);

			const lpWildTvl =
				Number(wildPrice) * Number(ethers.utils.formatEther(wildBalance));
			const lpWEthTvl =
				Number(ethPrice) * Number(ethers.utils.formatEther(wethBalance));

			const lpTvl = lpWildTvl + lpWEthTvl;

			return lpTvl / Number(ethers.utils.formatEther(lpTokenTotalSupply));
		},
		{
			enabled: wildPrice !== undefined,
		},
	);
};

const getEthPrice = async () => {
	const res = await fetch(
		'https://token-price.brett-b26.workers.dev?slug=ethereum',
	);
	const body = await res.json();
	return body.data['1027'].quote.USD.price;
};
