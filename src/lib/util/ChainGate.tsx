import { FC, ReactNode } from 'react';
import { Network } from '../constants/networks';
import useWeb3 from '../hooks/useWeb3';

interface ChainGateProps {
	children: ReactNode;
}

const ChainGate: FC<ChainGateProps> = ({ children }) => {
	const { chainId } = useWeb3();

	const isSupportedNetwork = Object.values(Network).includes(chainId);

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
