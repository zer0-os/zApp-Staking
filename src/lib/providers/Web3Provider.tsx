import { providers } from 'ethers';
import { FC, createContext, ReactNode } from 'react';

interface Web3ProviderProps {
	account?: string;
	chainId?: number;
	connectWallet?: () => void;
	provider?: providers.Web3Provider;
	children?: ReactNode;
}

const INFURA_MAINNET =
	'https://mainnet.infura.io/v3/77c3d733140f4c12a77699e24cb30c27';

export const Web3Context = createContext({
	account: undefined as string | undefined,
	provider: undefined as providers.Web3Provider | undefined,
	chainId: undefined as number | undefined,
	connectWallet: () => {},
});

const Web3Provider: FC<Web3ProviderProps> = ({
	account,
	chainId,
	connectWallet,
	provider,
	children,
}: Web3ProviderProps) => {
	return (
		<Web3Context.Provider
			value={{
				account,
				chainId,
				provider,
				connectWallet,
			}}
		>
			{children}
		</Web3Context.Provider>
	);
};

export default Web3Provider;
