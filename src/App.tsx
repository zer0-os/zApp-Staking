/**
 * NOTE: You will need to `npm link` zUI before this repo
 * will build or run.
 */

import { FC } from 'react';
import { AppProps } from './lib/types/app';

import { TabNav } from '@zero-tech/zui/components';

import PoolsPage from './pages/Pools';
import DepositsPage from './pages/Deposits';

import styles from './App.module.scss';

const App: FC<AppProps> = ({ provider, route }: AppProps) => {
	return (
		<main className={styles.Main}>
			<TabNav
				defaultValue={'Pools'}
				tabs={[
					{
						text: 'Pools',
						to: '/wilder/staking/pools',
						content: <PoolsPage />,
					},
					{
						text: 'Deposits',
						to: '/wilder/staking/deposits',
						content: <DepositsPage />,
					},
				]}
			/>
		</main>
	);
};

export default App;
