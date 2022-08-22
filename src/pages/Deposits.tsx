import DepositsTable from '../features/my-deposits/DepositsTable';
import useWeb3 from '../lib/hooks/useWeb3';
import Button from '@zero-tech/zui/components/Button';
import styles from './Deposits.module.scss';
import ConnectWallet from '../features/ui/ConnectWallet/ConnectWallet';

const Deposits = () => {
	const { account, connectWallet } = useWeb3();

	if (!account) {
		return (
			<ConnectWallet
				message={'Connect a Web3 wallet to see your Staking data.'}
			/>
		);
	} else {
		return <DepositsTable account={account} />;
	}
};

export default Deposits;
