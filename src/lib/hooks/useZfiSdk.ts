import { useContext } from 'react';
import { ZFiSdkContext } from '../providers/ZFiSdkProvider';

export const useZfiSdk = () => {
	return useContext(ZFiSdkContext);
};
