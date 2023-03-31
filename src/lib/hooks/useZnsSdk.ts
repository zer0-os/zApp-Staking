import { useContext } from 'react';
import { ZnsSdkContext } from '../providers/ZnsSdkProvider';

export const useZnsSdk = () => {
	return useContext(ZnsSdkContext);
};
