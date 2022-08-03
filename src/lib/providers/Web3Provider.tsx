import { providers } from 'ethers';
import { FC, createContext, ReactNode } from 'react';
import { Network } from '../constants/networks';

interface Web3ProviderProps {
	address?: string;
	chainId?: number;
	provider?: providers.Web3Provider;
	children?: ReactNode;
}

const INFURA_MAINNET =
	'https://mainnet.infura.io/v3/77c3d733140f4c12a77699e24cb30c27';

export const Web3Context = createContext({
	address: undefined as string | undefined,
	provider: undefined as providers.Web3Provider | undefined,
	chainId: undefined as number | undefined,
});

const Web3Provider: FC<Web3ProviderProps> = ({
	address,
	chainId,
	provider,
	children,
}: Web3ProviderProps) => {
	return (
		<Web3Context.Provider
			value={{
				address: address,
				chainId: chainId,
				provider: provider,
			}}
		>
			{children}
		</Web3Context.Provider>
	);
};

export default Web3Provider;
