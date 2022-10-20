import React, { useMemo } from 'react';
import {
	Switch,
	Route,
	Redirect,
	useRouteMatch,
	useLocation,
} from 'react-router-dom';

import { TabsNav } from '@zero-tech/zui/components';

import { Pools as PoolsPage } from './pages/Pools';
import { Deposits as DepositsPage } from './pages/Deposits';

import styles from './App.module.scss';
import {
	AppContent,
	AppContextPanel,
	AppLayout,
} from '@zer0-os/zos-component-library';

export const App = () => {
	const { pathname } = useLocation();
	let { url: baseUrl } = useRouteMatch();

	const TABS = useMemo(
		() => [
			{ text: 'Pools', to: baseUrl + '/pools' },
			{ text: 'Deposits', to: baseUrl + '/deposits' },
		],
		[baseUrl],
	);

	return (
		<AppLayout>
			<AppContextPanel>
				<ul className={styles.DummyContext}>
					<li># placeholder</li>
					<li># staking</li>
					<li># pools</li>
				</ul>
			</AppContextPanel>
			<AppContent>
				<main className={styles.Main}>
					<TabsNav tabs={TABS} location={pathname} />
					<Switch>
						<Route path={baseUrl + '/pools'} component={PoolsPage} />
						<Route path={baseUrl + '/deposits'} component={DepositsPage} />
						<Route path={baseUrl} exact>
							<Redirect to={baseUrl + '/pools'} />
						</Route>
					</Switch>
				</main>
			</AppContent>
		</AppLayout>
	);
};
