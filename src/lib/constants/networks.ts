export enum Network {
	MAINNET = 1,
	RINKEBY = 4,
	GOERLI = 5,
}

export const DEFAULT_NETWORK = Network.MAINNET;

interface NetworkConfig {
	rpcUrl: string;
	subgraphUrl: string;
	stakeFactory: string;
	wildStakingPool: string;
	lpToken: string;
	lpStakingPool: string;
}

export const NETWORK_CONFIGS: { [network in Network]: NetworkConfig } = {
	[Network.MAINNET]: {
		rpcUrl: 'https://mainnet.infura.io/v3/431b9a830d8b40b8909bdc74492adb2a',
		subgraphUrl: 'https://api.thegraph.com/subgraphs/name/zer0-os/zfi',
		stakeFactory: '0xF133faFd49f4671ac63EE3a3aE7E7C4C9B84cE4a',
		wildStakingPool: '0x3aC551725ac98C5DCdeA197cEaaE7cDb8a71a2B4',
		lpToken: '0xcaA004418eB42cdf00cB057b7C9E28f0FfD840a5',
		lpStakingPool: '0x9E87a268D42B0Aba399C121428fcE2c626Ea01FF',
	},
	[Network.RINKEBY]: {
		rpcUrl: 'https://rinkeby.infura.io/v3/fa959ead3761429bafa6995a4b25397e',
		subgraphUrl: 'https://api.thegraph.com/subgraphs/name/zer0-os/zfi-rinkeby',
		stakeFactory: '0xb1d051095B6b2f6C93198Cbaa9bb7cB2d607215C',
		wildStakingPool: '0xE0Bb298Afc5dC12918d02732c824DA44e7D61E2a',
		lpToken: '0x123c1B5A87E4E11663F2604f3EbCAf4ba86e25E1',
		lpStakingPool: '0xe7BEeedAf11eE695C4aE64A01b24F3F7eA294aB6',
	},
	[Network.GOERLI]: {
		rpcUrl: 'https://goerli.infura.io/v3/fa959ead3761429bafa6995a4b25397e',
		subgraphUrl: 'https://api.thegraph.com/subgraphs/name/zer0-os/zfi-rinkeby',
		stakeFactory: '0xAeEaC5F790dD98FD7166bBD50d9938Bf542AFeEf',
		wildStakingPool: '0x376030f58c76ECC288a4fce8F88273905544bC07',
		lpToken: '0x3Fa5ae3F31D38bCc2cf1dA2394c938dA8a1C9f69',
		lpStakingPool: '0xCa0F071fcf5b36436F75E422b5Bd23666015b9f9',
	},
};
