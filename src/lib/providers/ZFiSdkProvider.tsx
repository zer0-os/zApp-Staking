import { providers } from 'ethers';
import { createContext, FC, ReactNode, useMemo } from 'react';

import * as zfi from '@zero-tech/zfi-sdk';

import { Network, NETWORK_CONFIGS } from '../constants/networks';
import useWeb3 from '../hooks/useWeb3';

interface ZFiSdkProviderProps {
	provider?: providers.Web3Provider;
	children: ReactNode;
}

// @TODO: not sure if this is the best way to create default context
export const ZFiSdkContext = createContext(
	zfi.createInstance({
		wildPoolAddress: NETWORK_CONFIGS[Network.MAINNET].wildStakingPool,
		lpTokenPoolAddress: NETWORK_CONFIGS[Network.MAINNET].lpStakingPool,
		factoryAddress: NETWORK_CONFIGS[Network.MAINNET].stakeFactory,
		provider: new providers.JsonRpcProvider(
			NETWORK_CONFIGS[Network.MAINNET].rpcUrl,
		),
		subgraphUri: NETWORK_CONFIGS[Network.MAINNET].subgraphUrl,
	}),
);

const ZFiSdkProvider: FC<ZFiSdkProviderProps> = ({
	children,
}: ZFiSdkProviderProps) => {
	const { provider: providerContext } = useWeb3();

	const sdk = useMemo(() => {
		const provider =
			providerContext ??
			new providers.JsonRpcProvider(NETWORK_CONFIGS[Network.MAINNET].rpcUrl);

		// We know that the chain ID will be a valid network because
		// ChainGate will prevent this provider from rendering if
		// the chain matches an unsupported network
		const network: Network = provider?._network?.chainId ?? 4;

		return zfi.createInstance({
			wildPoolAddress: NETWORK_CONFIGS[network].wildStakingPool,
			lpTokenPoolAddress: NETWORK_CONFIGS[network].lpStakingPool,
			factoryAddress: NETWORK_CONFIGS[network].stakeFactory,
			provider,
			subgraphUri: NETWORK_CONFIGS[network].subgraphUrl,
		});
	}, [providerContext]);

	return (
		<ZFiSdkContext.Provider value={sdk}>{children}</ZFiSdkContext.Provider>
	);
};

export default ZFiSdkProvider;
