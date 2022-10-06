import { QueryKey, useQueryClient } from 'react-query';
import { ContractReceipt, ContractTransaction } from 'ethers';
import { getReadableEthersError } from './util/errors';

export interface TransactionOptions {
	onStart?: () => void;
	onProcessing?: (tx?: ContractTransaction) => void;
	onSuccess?: (receipt?: ContractReceipt) => void;
	onError?: (error: Error) => void;
	invalidationKeys?: QueryKey[];
}

type TransactionFunction = (...args: any) => Promise<ContractTransaction>;

export const useTransaction = () => {
	const queryClient = useQueryClient();

	/**
	 * Invalidates a list of react-query query keys.
	 * @param queries query keys to invalidate
	 */
	async function invalidateQueries(
		queries: TransactionOptions['invalidationKeys'],
	) {
		const flattenedQueries = queries.flat();
		return Promise.all(
			flattenedQueries.map((query) => queryClient.invalidateQueries(query)),
		);
	}

	async function executeTransaction<T extends TransactionFunction>(
		transactionFunction: T,
		parameters: Parameters<T>,
		options?: TransactionOptions,
	) {
		try {
			options?.onStart?.();
			const tx = await transactionFunction(...parameters);
			options?.onProcessing(tx);
			const receipt = await tx.wait();
			if (options?.invalidationKeys) {
				await invalidateQueries(options?.invalidationKeys);
			}
			options?.onSuccess?.(receipt);
		} catch (e: any) {
			options?.onError?.(new Error(getReadableEthersError(e)));
			console.error('Failed to execute transaction!', {
				transactionFunction,
				parameters,
				options,
				e,
			});
		}
	}

	return { executeTransaction };
};
