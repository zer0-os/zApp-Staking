import millify from 'millify';
import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

export const formatWei = (wei: BigNumber | string, decimalPlaces?: number) => {
	return formatBigNumberString(formatUnits(wei, decimalPlaces), decimalPlaces);
};

export const formatBigNumberString = (str: string, decimalPlaces?: number) => {
	const split = str.split('.');
	return `${Number(str.split('.')[0]).toLocaleString()}${
		split.length === 2 && split[1] !== '0'
			? '.' + split[1].slice(0, decimalPlaces ?? 18)
			: ''
	}`;
};

export const formatFiat = (amount: number | string) => {
	return Number(amount).toLocaleString(undefined, {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	});
};

export const formatPercentage = (percentage: number | string) => {
	return formatFiat(percentage) + '%';
};

export const formatTimestamp = (timestamp: string) => {
	return new Date(Number(timestamp)).toLocaleDateString();
};

export const millifyNumber = (num: number) => {
	if (num < 10000) {
		return num;
	}
	return millify(num, { precision: 2 });
};

export function formatWeiAmount(num: string, decimalPlaces?: number): string {
	const stringValue = num.padStart(19, '0');
	const whole = stringValue.slice(0, -18);
	const decimal = stringValue.slice(-18).slice(0, 4).replace(/0+$/, '');
	const decimalString = decimal.length > 0 ? `.${decimal}` : '';

	const asString = whole + decimalString;
	const asNum = Number(asString);

	if (asNum > 100000 || asNum <= -100000) {
		return millify(asNum, { precision: decimalPlaces ?? 2 });
	}

	return asNum.toLocaleString('en-US', { maximumFractionDigits: 2 });
}
