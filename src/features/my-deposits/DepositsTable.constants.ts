import { Column } from '@zero-tech/zui/components/AsyncTable';

export const COLUMNS: Column[] = [
	{ id: 'pool', header: 'Pool', alignment: 'left' },
	{ id: 'claimed', header: 'Date Claimable', alignment: 'right' },
	{ id: 'amount', header: 'Amount', alignment: 'right' },
	{ id: 'action', header: '', alignment: 'right' },
];
