import { useContext } from 'react';
import { Web3Context } from '../providers/Web3Provider';

export const useWeb3 = () => {
	return useContext(Web3Context);
};
