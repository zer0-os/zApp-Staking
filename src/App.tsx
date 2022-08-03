/**
 * NOTE: You will need to `npm link` zUI before this repo
 * will build or run.
 */

import { FC } from 'react';
import { AppProps } from './lib/types/app';

import TabNav from 'zero-ui/src/components/TabNav';

import PoolsPage from './pages/Pools';
import DepositsPage from './pages/Deposits';

const App: FC<AppProps> = ({ provider, route }: AppProps) => {
	return (
		<main>
			<TabNav
				defaultValue={'Deposits'}
				tabs={[
					{
						text: 'Pools',
						to: '/pools',
						content: <PoolsPage />,
					},
					{
						text: 'Deposits',
						to: '/deposits',
						content: <DepositsPage />,
					},
				]}
			/>
		</main>
	);
};

export default App;
