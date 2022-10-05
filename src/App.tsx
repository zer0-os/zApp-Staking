import { FC } from 'react';

import { Tabs } from '@zero-tech/zui/components/Tabs';

import { Pools as PoolsPage } from './pages/Pools';
import { Deposits as DepositsPage } from './pages/Deposits';

import classNames from 'classnames';
import styles from './App.module.scss';

export const App: FC = () => {
	return (
		<main className={classNames(styles.Main, 'app-layout')}>
			<Tabs
				defaultValue={'Pools'}
				tabs={[
					{
						text: 'Pools',
						// to: '/wilder/staking/pools',
						content: <PoolsPage />,
					},
					{
						text: 'Deposits',
						// to: '/wilder/staking/deposits',
						content: <DepositsPage />,
					},
				]}
			/>
		</main>
	);
};
