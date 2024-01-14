import { Contract } from 'ethers';
import { ERC20_ABI } from './erc20';

export const lpTokenContract = (provider: any) => {
	return new Contract(
		'0xcaA004418eB42cdf00cB057b7C9E28f0FfD840a5',
		ERC20_ABI,
		provider,
	);
};
