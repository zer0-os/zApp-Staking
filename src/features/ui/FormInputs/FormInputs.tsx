import { FC } from 'react';

import { BigNumber } from 'ethers';
import { formatWei } from '../../../lib/util/format';
import { PoolInfo } from '../../../lib/types/pool';

import { useFormInputs } from './useFormInputs';

import { ViewPool } from '../ViewPool';
import { Button } from '@zero-tech/zui/components/Button';
import { Skeleton } from '@zero-tech/zui/components/Skeleton';
import { NumberInput } from '@zero-tech/zui/components/Input/NumberInput';

import styles from './FormInputs.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

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
	onSubmit?: (wei: BigNumber) => void;
	isTransactionPending?: boolean;
	message?: Message;
}

export const FormInputs: FC<FormInputsProps> = ({
	action,
	poolMetadata,
	poolInstance,
	balances,
	onSubmit,
	isTransactionPending,
	message,
}) => {
	const {
		amountString,
		amountStringLocale,
		handleOnAmountChange,
		handleOnMax,
		handleOnSubmit,
		isValidAmount,
		isReadyForInput,
	} = useFormInputs({
		maxAmount: balances?.[0]?.value,
		tokenDecimalPlaces: poolMetadata.tokenDecimals,
		onSubmit,
	});

	const isInputDisabled = isTransactionPending || !isReadyForInput;

	const submitButtonLabel =
		action +
		(amountStringLocale && poolMetadata.tokenTicker
			? ` ${amountStringLocale} ${poolMetadata.tokenTicker}`
			: '');

	return (
		<div className={styles.Container}>
			{message && <MessageBanner {...message} />}
			<ViewPool poolMetadata={poolMetadata} poolInstance={poolInstance} />
			{action !== 'claim' && (
				<NumberInput
					value={amountString}
					onChange={handleOnAmountChange}
					isDisabled={isInputDisabled}
					label={'Amount'}
					placeholder={'Amount'}
					endEnhancer={
						<Button
							isDisabled={!balances[0]?.value || isInputDisabled}
							onPress={handleOnMax}
							variant="text"
						>
							MAX
						</Button>
					}
				/>
			)}
			<Button
				isLoading={isTransactionPending}
				isDisabled={action !== 'claim' && !isValidAmount}
				onPress={handleOnSubmit}
			>
				{submitButtonLabel}
			</Button>
			{balances && <Balances balances={balances} />}
		</div>
	);
};

/*****************
 * Subcomponents *
 *****************/

const MessageBanner = ({ text, isError }: Message) => (
	<span className={cx(styles.Message, { Error: isError })}>{text}</span>
);

const Balances = ({ balances }: { balances: Balance[] }) => (
	<ul className={styles.Balances}>
		{balances.map((balance) => (
			<BalanceItem key={balance.label} {...balance} />
		))}
	</ul>
);

const BalanceItem = ({ label, value, isLoading }: Balance) => (
	<div className={styles.Balance}>
		<span>{label}</span>
		<b>
			{isLoading ? <Skeleton width={150} /> : value ? formatWei(value) : 'ERR'}
		</b>
	</div>
);
