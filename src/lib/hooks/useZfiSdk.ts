import { useContext } from 'react';
import { ZFiSdkContext } from '../providers/ZFiSdkProvider';

/**
 * Wraps useContext in a more specific wrapper.
 * This is mainly just for DX.
 * @returns context from zFi SDK provider
 */
export function useZfiSdk() {
	return useContext(ZFiSdkContext);
}
