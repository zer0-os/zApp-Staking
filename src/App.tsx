import React, { useMemo } from 'react';
import {
	Switch,
	Route,
	Redirect,
	useRouteMatch,
	useLocation,
} from 'react-router-dom';

import { useQueryClient } from 'react-query';
import {
	DynamicSizeWrapper,
	ZAppContent,
} from '@zero-tech/zapp-utils/components';

import { Pools as PoolsPage } from './pages/Pools';
import { Deposits as DepositsPage } from './pages/Deposits';
import { TabsNav } from '@zero-tech/zui/components';

import styles from './App.module.scss';

const getTabs = (baseUrl: string) => {
	return [
		{ text: 'Pools', to: baseUrl + '/pools' },
		{ text: 'Deposits', to: baseUrl + '/deposits' },
	];
};

export const App = () => {
	const { pathname } = useLocation();
	const { url: baseUrl } = useRouteMatch();

	const queryClient = useQueryClient();

	queryClient.defaultQueryOptions({
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});

	const TABS = useMemo(() => getTabs(baseUrl), [baseUrl]);

	return (
		<DynamicSizeWrapper>
			<ZAppContent>
				<main className={styles.Main}>
					<a
						href={
							'https://wiki.wilderworld.com/tokens-and-wallets/wilder-world-staking-site'
						}
						className={styles.Banner}
						target={'_blank'}
						rel="noreferrer"
					>
						Learn more about staking in the <b>Wilder World Wiki</b>
					</a>
					<TabsNav tabs={TABS} location={pathname} />
					<Switch>
						<Route path={baseUrl + '/pools'} component={PoolsPage} />
						<Route path={baseUrl + '/deposits'} component={DepositsPage} />
						<Route path={baseUrl} exact>
							<Redirect to={baseUrl + '/pools'} />
						</Route>
					</Switch>
				</main>
			</ZAppContent>
		</DynamicSizeWrapper>
	);
};
