/* For zFi-app 0.1.0, the pools are hardcoded.
 * This will be expanded in future as the protocol-level
 * stuff is worked out.
 */

import { ReactNode } from 'react';

import wildPoolIcon from '../../assets/wild-pool.png';
import lpPoolIcon from '../../assets/lp-pool.png';

export interface PoolMetadata {
	name: string;
	icon: string;

	tokenTicker: string;
	tokenPurchaseUrl: string;
	tokenDecimals: number;

	additionalInfo?: ReactNode;
}

export const POOL_METADATA = {
	WILD_POOL: {
		name: 'Stake WILD',
		icon: wildPoolIcon,
		tokenTicker: 'WILD',
		tokenPurchaseUrl: 'https://zer0.io/', // @TODO: get real token purchase URL
		tokenDecimals: 18,
	},
	LP_POOL: {
		name: 'Farm WILD - WETH LP',
		icon: lpPoolIcon,
		tokenTicker: 'LP',
		tokenPurchaseUrl: 'https://zer0.io/', // @TODO: get real token purchase URL
		tokenDecimals: 18,
		additionalInfo: (
			<>
				How do I get LP?{' '}
				<a
					style={{
						color: 'inherit',
						textDecoration: 'underline',
					}}
					href={
						'https://app.uniswap.org/#/add/v2/0x2a3bFF78B79A009976EeA096a51A948a3dC00e34/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2?chain=mainnet'
					}
					target={'_blank'}
					rel="noreferrer"
				>
					Add to liquidity pool
				</a>
			</>
		),
	},
};
