import './lib/instrument';
import './vite-setup';

import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { createConfig, mainnet, WagmiConfig } from 'wagmi';
import { createPublicClient, http } from 'viem';

import { ThemeEngine } from '@zero-tech/zui/components';
import { Themes } from '@zero-tech/zui/components/ThemeEngine';
import { DevApp } from './components/DevApp';

import './main.css';

const history = createBrowserHistory();

// @ts-ignore
const { VITE_TIMESTAMP_OVERRIDE } = import.meta.env;

if (VITE_TIMESTAMP_OVERRIDE) {
	Date.now = function () {
		return VITE_TIMESTAMP_OVERRIDE;
	};
	Date.prototype.getTime = function () {
		return VITE_TIMESTAMP_OVERRIDE;
	};
}

const config = createConfig({
	autoConnect: true,
	publicClient: createPublicClient({
		chain: mainnet,
		transport: http(),
	}),
});

ReactDOM.render(
	<React.StrictMode>
		<Router history={history}>
			<WagmiConfig config={config}>
				<button
					onClick={() => {
						throw new Error('This is your first error!');
					}}
				>
					Break the world
				</button>
				<ThemeEngine theme={Themes.Dark} />
				<DevApp />
			</WagmiConfig>
		</Router>
	</React.StrictMode>,
	document.getElementById('root'),
);
