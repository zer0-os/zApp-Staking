import { useQuery } from 'react-query';
import { useZfiSdk } from './useZfiSdk';
import { useWeb3 } from './useWeb3';
import { useTokenPrices } from '@/lib/hooks/usePoolData';
import { corePoolContract } from '@/lib/contracts/core-pool';
import { ethers } from 'ethers';

interface UseUserValueStakedParams {
	account: string;
}

export const useUserValueStaked = ({ account }: UseUserValueStakedParams) => {
	const { chainId, provider } = useWeb3();
	const { wildPool, liquidityPool } = useZfiSdk();
	const { wildPrice, lpPrice } = useTokenPrices();

	return useQuery(
		['user', 'staked', { account, chainId }],
		async () => {
			const wildPoolContract = corePoolContract(wildPool.address, provider);
			const lpPoolContract = corePoolContract(liquidityPool.address, provider);

			const wildPoolBalance = await wildPoolContract.balanceOf(account);
			const lpPoolBalance = await lpPoolContract.balanceOf(account);

			const wildPoolValue =
				Number(ethers.utils.formatEther(wildPoolBalance.toString())) *
				wildPrice;
			const lpPoolValue =
				Number(ethers.utils.formatEther(lpPoolBalance.toString())) * lpPrice;

			return wildPoolValue + lpPoolValue;
		},
		{
			enabled:
				Boolean(account) && wildPrice !== undefined && lpPrice !== undefined,
			refetchOnWindowFocus: false,
		},
	);
};
