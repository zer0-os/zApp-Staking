import { FC, useState } from 'react';

import { BigNumber } from 'ethers';
import { formatWei } from '../../../lib/util/format';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { PoolInfo } from '../../../lib/types/pool';

import { ViewPool } from '../ViewPool';
import { Button } from '@zero-tech/zui/components/Button';
import { Skeleton } from '@zero-tech/zui/components/Skeleton';
import { Input } from '@zero-tech/zui/components/Input';

import styles from './FormInputs.module.scss';

export interface Balance {
	label: string;
	value?: BigNumber;
	isLoading: boolean;
}

export interface Message {
	text: string;
	isError?: boolean;
}

export interface FormInputsProps extends PoolInfo {
	action: 'stake' | 'unstake' | 'claim';
	balances?: Balance[];
	onSubmit: (amount: BigNumber) => void;
	isTransactionPending?: boolean;
	message?: Message;
}

export const FormInputs: FC<FormInputsProps> = ({
	action,
	poolMetadata,
	poolInstance,
	balances,
	onSubmit: onSubmitProps,
	isTransactionPending,
	message,
}) => {
	const [amountInputValue, setAmountInputValue] = useState<string>('');

	const buttonLabel = amountInputValue
		? `${action} ${amountInputValue.toLocaleString()} ${
				poolMetadata.tokenTicker
		  }`
		: action;

	const onSubmit = () => {
		onSubmitProps(parseUnits(amountInputValue, poolMetadata.tokenUnits));
	};

	const setMax = () => {
		if (balances[0]?.value) {
			setAmountInputValue(
				formatUnits(balances[0].value, poolMetadata.tokenUnits),
			);
		}
	};

	return (
		<div className={styles.Container}>
			{message && <span className={styles.Error}>{message.text}</span>}
			<ViewPool poolMetadata={poolMetadata} poolInstance={poolInstance} />
			{action !== 'claim' && (
				<Input
					type="number"
					value={amountInputValue}
					onChange={setAmountInputValue}
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
