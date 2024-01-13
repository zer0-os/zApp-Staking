import { Contract } from 'ethers';
import ERC20Abi from './ERC20.json';

export const wethTokenContract = (provider: any) => {
	return new Contract(
		'0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
		ERC20Abi as any[],
		provider,
	);
};
