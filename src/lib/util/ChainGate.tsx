import { FC, ReactNode } from 'react';

import { Network } from '../constants/networks';
import { useWeb3 } from '../hooks/useWeb3';

interface ChainGateProps {
	children: ReactNode;
}

/**
 * Prevents rendering of children if the connected chain ID
 * is unsupported.
 */
const ChainGate: FC<ChainGateProps> = ({ children }) => {
	const { chainId } = useWeb3();

	const isSupportedNetwork =
		!chainId || Object.values(Network).includes(chainId);

	if (!isSupportedNetwork) {
		return (
			<>
				zFi dApp is not supported on this chain! Please switch to mainnet or
				Rinkeby
			</>
		);
	}

	return <>{children}</>;
};

export default ChainGate;
