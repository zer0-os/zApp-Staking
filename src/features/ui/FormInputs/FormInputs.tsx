import ViewPool, { ViewPoolProps } from '../ViewPool/ViewPool';
import { FC, useState } from 'react';
import styles from './FormInputs.module.scss';
import Button from 'zero-ui/src/components/Button';
import Skeleton from 'zero-ui/src/components/Skeleton';

export interface FormInputsBalance {
	label: string;
	value?: string;
	isLoading: boolean;
}

interface FormInputsProps extends ViewPoolProps {
	action: 'stake' | 'unstake' | 'claim';
	balances?: FormInputsBalance[];
	onSubmit: (amount: number) => void;
	isTransactionPending?: boolean;
	error?: string;
}

const FormInputs: FC<FormInputsProps> = ({
	action,
	poolMetadata,
	poolInstance,
	balances,
	onSubmit: onSubmitProps,
	isTransactionPending,
	error,
}) => {
	const [amountInputValue, setAmountInputValue] = useState<
		number | undefined
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

	console.log('button:', buttonLabel);

	return (
		<div className={styles.Container}>
			{error && <span className={styles.Error}>{error}</span>}
			<ViewPool poolMetadata={poolMetadata} poolInstance={poolInstance} />
			{action !== 'claim' && !isTransactionPending && (
				<input
					onChange={(evt: any) => setAmountInputValue(Number(evt.target.value))}
					onKeyPress={(event) => {
						if (!/[0-9]/.test(event.key)) {
							event.preventDefault();
						}
					}}
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
						{b.isLoading ? <Skeleton width={150} /> : b.value ? b.value : 'ERR'}
					</b>
				</div>
			))}
		</div>
	);
};

export default FormInputs;
