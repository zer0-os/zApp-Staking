/**
 * This file:
 * - Wraps out App in necessary context providers
 * - Exports the root component
 */

import { AppProps } from './lib/types/app';
import { App } from './App';

import { QueryClient, QueryClientProvider } from 'react-query';
import ZFiSdkProvider from './lib/providers/ZFiSdkProvider';
import ChainGate from './lib/util/ChainGate';
import Web3Provider from './lib/providers/Web3Provider';
import ZnsSdkProvider from './lib/providers/ZnsSdkProvider';

import { ZUIProvider } from '@zero-tech/zui/ZUIProvider';

const queryClient = new QueryClient();

export const StakingZApp = ({ provider, web3 }: AppProps) => (
	<QueryClientProvider client={queryClient}>
		<Web3Provider
			provider={provider}
			account={web3.address}
			chainId={web3.chainId}
			connectWallet={web3.connectWallet}
		>
			<ChainGate>
				<ZnsSdkProvider>
					<ZFiSdkProvider>
						<ZUIProvider>
							<App />
						</ZUIProvider>
					</ZFiSdkProvider>
				</ZnsSdkProvider>
			</ChainGate>
		</Web3Provider>
	</QueryClientProvider>
);
