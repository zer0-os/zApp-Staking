import { Contract } from 'ethers';
import ERC20Abi from './ERC20.json';

export const lpTokenContract = (provider: any) => {
	return new Contract(
		'0xcaA004418eB42cdf00cB057b7C9E28f0FfD840a5',
		ERC20Abi as any[],
		provider,
	);
};
