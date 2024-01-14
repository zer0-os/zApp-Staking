import { Contract } from 'ethers';
import { ERC20_ABI } from './erc20';

export const wethTokenContract = (provider: any) => {
	return new Contract(
		'0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
		ERC20_ABI,
		provider,
	);
};
