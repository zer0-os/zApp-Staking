import { FC } from 'react';

import { TabNav } from '@zero-tech/zui/components';

import { Pools as PoolsPage } from './pages/Pools';
import { Deposits as DepositsPage } from './pages/Deposits';

import styles from './App.module.scss';

export const App: FC = () => {
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
