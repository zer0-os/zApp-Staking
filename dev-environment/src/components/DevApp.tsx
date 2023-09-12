import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { StakingZApp } from '@/index';

import { ethers } from 'ethers';
import { useAccount, useConnect } from 'wagmi';
import { useEthersProvider } from '../lib/useEthersProvider';
import { injectedConnector } from '../lib/connectors';

import { DevControls } from './DevControls';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const RPC_URL = import.meta.env.VITE_RPC_URL_1;

export const DevApp = () => {
	const { address } = useAccount();
	const { connect } = useConnect({
		connector: injectedConnector,
	});

	const provider = useEthersProvider({ chainId: 1 });

	if (!RPC_URL) {
		throw new Error(
			'Fill out .env.development.local before running dev environment',
		);
	}

	return (
		<>
			<DevControls />
			<Switch>
				<Route
					path="/:znsRoute/:app"
					component={() => (
						<StakingZApp
							provider={
								provider ?? new ethers.providers.JsonRpcProvider(RPC_URL)
							}
							route={'wilder'}
							web3={{
								chainId: provider?.network.chainId ?? 1,
								address: address,
								connectWallet: connect,
							}}
						/>
					)}
				/>
				<Route>
					<Redirect to={'/0.wilder/staking/pools'} />
				</Route>
			</Switch>
		</>
	);
};
