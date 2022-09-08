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
import classNames from 'classnames';

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

	const amountAsWei =
		amountInputValue && parseUnits(amountInputValue, poolMetadata.tokenUnits);
	const userBalance = balances[0]?.value;

	const buttonLabel = amountInputValue
		? `${action} ${amountInputValue.toLocaleString()} ${
				poolMetadata.tokenTicker
		  }`
		: action;

	const onSubmit = () => {
		onSubmitProps(amountAsWei);
	};

	const setMax = () => {
		if (userBalance) {
			setAmountInputValue(formatUnits(userBalance, poolMetadata.tokenUnits));
		}
	};

	return (
		<div className={styles.Container}>
			{message && (
				<span
					className={classNames(
						styles.Message,
						message.isError ? styles.Error : styles.Success,
					)}
				>
					{message.text}
				</span>
			)}
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
							isDisabled={!userBalance || isTransactionPending}
							onPress={setMax}
						>
							MAX
						</Button>
					}
				/>
			)}
			<Button
				isLoading={isTransactionPending}
				isDisabled={
					!amountInputValue ||
					!userBalance ||
					amountAsWei.lte(0) ||
					amountAsWei.gt(userBalance) ||
					isTransactionPending
				}
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
