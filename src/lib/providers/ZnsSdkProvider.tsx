import { createContext, FC, ReactNode, useMemo } from 'react';

import { providers } from 'ethers';
import * as zns from '@zero-tech/zns-sdk';
import { useWeb3 } from '../hooks/useWeb3';
import {
	DEFAULT_NETWORK,
	Network,
	NETWORK_CONFIGS,
} from '../constants/networks';

interface ZnsSdkProviderProps {
	children: ReactNode;
}

export const ZnsSdkContext = createContext(
	zns.createInstance(
		zns.configuration.mainnetConfiguration(
			new providers.JsonRpcProvider(NETWORK_CONFIGS[Network.MAINNET].rpcUrl),
		),
	),
);

const ZnsSdkProvider: FC<ZnsSdkProviderProps> = ({
	children,
}: ZnsSdkProviderProps) => {
	const { provider, chainId } = useWeb3();

	const sdk = useMemo(() => {
		const p =
			provider ??
			new providers.JsonRpcProvider(NETWORK_CONFIGS[DEFAULT_NETWORK].rpcUrl);

		// We know that the chain ID will be a valid network because
		// ChainGate will prevent this provider from rendering if
		// the chain matches an unsupported network
		const network: Network = chainId ?? 4;

		// Only supporting two networks so can use ternary
		const znsConfig =
			network === Network.MAINNET
				? zns.configuration.mainnetConfiguration
				: zns.configuration.rinkebyConfiguration;

		return zns.createInstance(znsConfig(p));
	}, [provider]);

	return (
		<ZnsSdkContext.Provider value={sdk}>{children}</ZnsSdkContext.Provider>
	);
};

export default ZnsSdkProvider;
