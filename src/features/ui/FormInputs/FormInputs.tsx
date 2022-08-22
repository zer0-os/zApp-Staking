import ViewPool, { ViewPoolProps } from '../ViewPool/ViewPool';
import { FC, useState } from 'react';
import styles from './FormInputs.module.scss';
import Button from '@zero-tech/zui/components/Button';
import Skeleton from '@zero-tech/zui/components/Skeleton';
import NumberInput from '@zero-tech/zui/components/Input/NumberInput';
import { BigNumber, ethers } from 'ethers';
import { formatWei } from '../../../lib/util/format';
import { formatEther } from 'ethers/lib/utils';

export interface FormInputsBalance {
	label: string;
	value?: BigNumber;
	isLoading: boolean;
}

interface Message {
	text: string;
	isError?: boolean;
}

interface FormInputsProps extends ViewPoolProps {
	action: 'stake' | 'unstake' | 'claim';
	balances?: FormInputsBalance[];
	onSubmit: (amount: number) => void;
	isTransactionPending?: boolean;
	message?: Message;
}

const FormInputs: FC<FormInputsProps> = ({
	action,
	poolMetadata,
	poolInstance,
	balances,
	onSubmit: onSubmitProps,
	isTransactionPending,
	message,
}) => {
	const [amountInputValue, setAmountInputValue] = useState<
		string | undefined
	>();

	const buttonLabel = amountInputValue
		? `${action} ${amountInputValue.toLocaleString()} ${
				poolMetadata.tokenTicker
		  }`
		: action;

	const onSubmit = () => {
		if (!isNaN(Number(amountInputValue))) {
			onSubmitProps(Number(amountInputValue));
		}
	};

	const setMax = () => {
		if (balances[0]?.value) {
			setAmountInputValue(formatEther(balances[0].value));
		}
	};

	return (
		<div className={styles.Container}>
			{message && <span className={styles.Error}>{message.text}</span>}
			<ViewPool poolMetadata={poolMetadata} poolInstance={poolInstance} />
			{action !== 'claim' && (
				<NumberInput
					value={amountInputValue.toLocaleString()}
					onChange={(val: string) => {
						console.log('change to ', val);
						setAmountInputValue(val);
					}}
					isDisabled={isTransactionPending}
					label={'Amount'}
					placeholder={'Amount'}
					endEnhancer={
						<Button
							isDisabled={!balances[0]?.value || isTransactionPending}
							onPress={setMax}
						>
							MAX
						</Button>
					}
					isBigNumber={true}
				/>
			)}
			<Button
				isLoading={isTransactionPending}
				isDisabled={!amountInputValue || isTransactionPending}
				onPress={onSubmit}
			>
				{buttonLabel}
			</Button>
			{balances?.map((b) => (
				<div className={styles.Balance} key={b.label}>
					<span>{b.label}</span>
					<b>
						{b.isLoading ? (
							<Skeleton width={150} />
						) : b.value ? (
							formatWei(b.value)
						) : (
							'ERR'
						)}
					</b>
				</div>
			))}
		</div>
	);
};

export default FormInputs;
