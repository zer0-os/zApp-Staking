import { BigNumber } from 'ethers';
import { useState } from 'react';

import type { FormInputsProps } from './FormInputs';
import { commify, formatUnits, parseUnits } from 'ethers/lib/utils';

interface UseFormInputsParams {
	maxAmount?: BigNumber;
	tokenDecimalPlaces?: number;
	onSubmit: FormInputsProps['onSubmit'];
}

/**
 * formatUnits returns a string with a leading 0, e.g. 1 -> 1.0.
 * This breaks the input field, so we need to remove any unnecessary decimal places.
 * @param wei amount in wei
 * @param tokenDecimalPlaces number of decimal places
 */
const formatWeiDecimals = (wei: BigNumber, tokenDecimalPlaces: number) => {
	try {
		const asString = formatUnits(wei, tokenDecimalPlaces)
			.toString()
			.replace(/\.0*$/, '');
		const asLocale = commify(asString);
		return { asString, asLocale };
	} catch {
		return undefined;
	}
};

export const useFormInputs = ({
	maxAmount,
	tokenDecimalPlaces,
	onSubmit,
}: UseFormInputsParams) => {
	const [amountWei, setAmountWei] = useState<BigNumber | undefined>();

	const isReadyForInput =
		maxAmount !== undefined && tokenDecimalPlaces !== undefined;

	const isValidAmount =
		amountWei?.gt(0) && maxAmount !== undefined && amountWei.lte(maxAmount);

	const amountStrings =
		amountWei &&
		tokenDecimalPlaces &&
		formatWeiDecimals(amountWei, tokenDecimalPlaces);

	const handleOnAmountChange = (val: string) => {
		if (!val.length) {
			setAmountWei(undefined);
		} else if (isReadyForInput) {
			try {
				const amount = parseUnits(val, tokenDecimalPlaces);
				setAmountWei(amount);
			} catch {
				console.error('Invalid amount', val);
			}
		}
	};

	const handleOnMax = () => {
		if (maxAmount) {
			setAmountWei(maxAmount);
		}
	};

	const handleOnSubmit = () => {
		if (isValidAmount) {
			onSubmit(amountWei);
		}
	};

	return {
		amountString: amountStrings?.asString,
		amountStringLocale: amountStrings?.asLocale,
		handleOnAmountChange,
		handleOnMax,
		handleOnSubmit,
		isValidAmount,
		isReadyForInput,
	};
};
