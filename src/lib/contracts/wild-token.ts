import { Contract } from 'ethers';
import ERC20Abi from './ERC20.json';

export const wildTokenContract = (provider: any) => {
	return new Contract(
		'0x2a3bFF78B79A009976EeA096a51A948a3dC00e34',
		ERC20Abi as any[],
		provider,
	);
};
