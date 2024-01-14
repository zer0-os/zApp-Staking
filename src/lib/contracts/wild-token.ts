import { Contract } from 'ethers';
import { ERC20_ABI } from './erc20';

export const wildTokenContract = (provider: any) => {
	return new Contract(
		'0x2a3bFF78B79A009976EeA096a51A948a3dC00e34',
		ERC20_ABI,
		provider,
	);
};
