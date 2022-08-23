import { PoolInstance } from '@zero-tech/zfi-sdk';
import { Column } from '@zero-tech/zui/components/AsyncTable';
import { PoolMetadata } from '../../lib/constants/pools';

export interface PoolTableData {
	address: string;
	instance: PoolInstance;
	metadata: PoolMetadata;
}

export const COLUMNS: Column[] = [
	{ id: 'pool', header: 'Pool', alignment: 'left' },
	{ id: 'apr', header: 'APR', alignment: 'right' },
	{ id: 'tvl', header: 'TVL', alignment: 'right' },
	{ id: 'action', header: '', alignment: 'right' },
];
