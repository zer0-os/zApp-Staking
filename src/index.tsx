/**
 * This file:
 * - Wraps out App in necessary context providers
 * - Exports the root component
 */

// Set up Sentry first!
import './lib/sentry';

import React from 'react';

import { AppProps } from './lib/types/app';
import { App } from './App';

import { QueryClient, QueryClientProvider } from 'react-query';

import ZFiSdkProvider from './lib/providers/ZFiSdkProvider';
import ChainGate from './lib/util/ChainGate';
import Web3Provider from './lib/providers/Web3Provider';
import ZnsSdkProvider from './lib/providers/ZnsSdkProvider';

import { ZUIProvider } from '@zero-tech/zui/ZUIProvider';

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
								<App />
							</ZUIProvider>
						</ZFiSdkProvider>
					</ZnsSdkProvider>
				</ChainGate>
			</Web3Provider>
		</QueryClientProvider>
	);
};

/*
 * 15/01/2024
 * The following is gross. It's a hack to re-route any CG
 * requests to our own proxy server (`supabase/functions/price`).
 *
 * This is necessary because it's easy to hit CG's rate limit.
 * The proxy server will cache each response for 10 minutes, meaning
 * we will only hit CG, at most, once every 10 minutes.
 *
 * The better alternative would be to handle this in the SDK, but
 * we're moving fast and need a quick fix.
 */

const SUPABASE_URL = 'https://mrjliccblgblgtyqdbgz.supabase.co';

if (!SUPABASE_URL) {
	throw new Error(
		'zApp Staking requires environment variable: VITE_STAKING_SUPABASE_URL',
	);
}

const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
	let [resource, config] = args;

	const url = new URL(resource.toString());

	if (
		url.hostname === 'api.coingecko.com' &&
		(url.pathname.includes('/coins/wilder-world') ||
			url.pathname.includes('/coins/ethereum'))
	) {
		resource = new URL('/functions/v1/price' + url.pathname, SUPABASE_URL);
	}

	return await originalFetch(resource, config);
};
