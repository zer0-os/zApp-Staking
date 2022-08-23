import { FC } from 'react';

import { TabNav } from '@zero-tech/zui/components';

import PoolsPage from './pages/Pools';
import DepositsPage from './pages/Deposits';

import styles from './App.module.scss';

const App: FC = () => {
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
