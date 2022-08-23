import { useContext } from 'react';
import { ZFiSdkContext } from '../providers/ZFiSdkProvider';

export function useZfiSdk() {
	return useContext(ZFiSdkContext);
}
