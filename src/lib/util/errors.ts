import { errors } from 'ethers';
import { getParsedEthersError } from '@enzoferey/ethers-error-parser';

const ERROR_SUFFIX = '.';

const DEFAULT_ERROR_MESSAGE = 'An unknown error has occured.';

const ETHERS_ERROR_MESSAGES: { [error in errors]: string } = {
	[errors.ACTION_REJECTED]: 'Transaction rejected in wallet' + ERROR_SUFFIX,
	[errors.BUFFER_OVERRUN]: 'Buffer overun' + ERROR_SUFFIX,
	[errors.CALL_EXCEPTION]: 'Call exception' + ERROR_SUFFIX,
	[errors.INSUFFICIENT_FUNDS]:
		'Insufficient funds required for this transaction' + ERROR_SUFFIX,
	[errors.INVALID_ARGUMENT]: 'Invalid argument' + ERROR_SUFFIX,
	[errors.MISSING_ARGUMENT]: 'Missing argument' + ERROR_SUFFIX,
	[errors.MISSING_NEW]: 'Missing new' + ERROR_SUFFIX,
	[errors.NETWORK_ERROR]: 'Network error' + ERROR_SUFFIX,
	[errors.NONCE_EXPIRED]: 'Nonce expired' + ERROR_SUFFIX,
	[errors.NOT_IMPLEMENTED]: 'Not implemented' + ERROR_SUFFIX,
	[errors.NUMERIC_FAULT]: 'Numeric fault' + ERROR_SUFFIX,
	[errors.REPLACEMENT_UNDERPRICED]: 'Replacement underpriced' + ERROR_SUFFIX,
	[errors.SERVER_ERROR]: 'Server error' + ERROR_SUFFIX,
	[errors.TIMEOUT]: 'Transaction timed out' + ERROR_SUFFIX,
	[errors.TRANSACTION_REPLACED]: 'Transaction replaced' + ERROR_SUFFIX,
	[errors.UNEXPECTED_ARGUMENT]: 'Unexpected argument' + ERROR_SUFFIX,
	[errors.UNKNOWN_ERROR]: DEFAULT_ERROR_MESSAGE + ERROR_SUFFIX,
	[errors.UNPREDICTABLE_GAS_LIMIT]: 'Unpredictable gas limit' + ERROR_SUFFIX,
	[errors.UNSUPPORTED_OPERATION]: 'Unsupported operation' + ERROR_SUFFIX,
};

enum CustomErrors {
	REJECTED_TRANSACTION = 'REJECTED_TRANSACTION',
}

export const CUSTOM_ERROR_MESSAGES: { [error in CustomErrors]: string } = {
	[CustomErrors.REJECTED_TRANSACTION]:
		ETHERS_ERROR_MESSAGES[errors.ACTION_REJECTED],
};

export const getReadableEthersError = (error: any) => {
	const errorCode = getParsedEthersError(error).errorCode;
	return (
		ETHERS_ERROR_MESSAGES[errorCode] ||
		CUSTOM_ERROR_MESSAGES[errorCode] ||
		DEFAULT_ERROR_MESSAGE
	);
};
