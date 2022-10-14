/**
 * This file:
 * - Wraps out App in necessary context providers
 * - Exports the root component
 */
import React from 'react';

import { AppProps } from './lib/types/app';
import { App } from './App';

import { QueryClient, QueryClientProvider } from 'react-query';

import ZFiSdkProvider from './lib/providers/ZFiSdkProvider';
import ChainGate from './lib/util/ChainGate';
import Web3Provider from './lib/providers/Web3Provider';
import ZnsSdkProvider from './lib/providers/ZnsSdkProvider';

import { ZUIProvider } from '@zero-tech/zui/ZUIProvider';
import {
	AppContent,
	AppContextPanel,
	AppLayout,
} from '@zer0-os/zos-component-library';

const queryClient = new QueryClient();

export const StakingZApp = ({ provider, web3 }: AppProps) => {
	return (
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
								<AppLayout>
									<AppContextPanel>howdy</AppContextPanel>
									<AppContent>
										<App />
									</AppContent>
								</AppLayout>
							</ZUIProvider>
						</ZFiSdkProvider>
					</ZnsSdkProvider>
				</ChainGate>
			</Web3Provider>
		</QueryClientProvider>
	);
};
