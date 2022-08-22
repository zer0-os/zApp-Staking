import useWeb3 from '../../../lib/hooks/useWeb3';
import { FC } from 'react';
import Button from '@zero-tech/zui/components/Button';
import styles from './ConnectWallet.module.scss';

interface ConnectWalletProps {
	buttonText?: string;
	message: string;
}

const ConnectWallet: FC<ConnectWalletProps> = ({ buttonText, message }) => {
	const { connectWallet } = useWeb3();

	return (
		<div className={styles.Container}>
			<p>{message}</p>
			<Button onPress={connectWallet}>{buttonText ?? 'Connect Wallet'}</Button>
		</div>
	);
};

export default ConnectWallet;
