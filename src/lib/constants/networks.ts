export enum Network {
  MAINNET = 1,
  RINKEBY = 4,
}

const ENV_NETWORK = process.env.REACT_APP_DEFAULT_NETWORK;
export const DEFAULT_NETWORK = Network.RINKEBY;
// export const DEFAULT_NETWORK: Network = (
//   ENV_NETWORK && typeof ENV_NETWORK === "number" && Network[ENV_NETWORK]
//     ? Network[ENV_NETWORK]
//     : Network.MAINNET
// ) as Network;

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
    rpcUrl: "https://mainnet.infura.io/v3/77c3d733140f4c12a77699e24cb30c27",
    subgraphUrl: "https://api.thegraph.com/subgraphs/name/zer0-os/zfi",
    stakeFactory: "0xF133faFd49f4671ac63EE3a3aE7E7C4C9B84cE4a",
    wildStakingPool: "0x3aC551725ac98C5DCdeA197cEaaE7cDb8a71a2B4",
    lpToken: "0xcaA004418eB42cdf00cB057b7C9E28f0FfD840a5",
    lpStakingPool: "0x9E87a268D42B0Aba399C121428fcE2c626Ea01FF",
  },
  [Network.RINKEBY]: {
    rpcUrl: "https://rinkeby.infura.io/v3/fa959ead3761429bafa6995a4b25397e",
    subgraphUrl: "https://api.thegraph.com/subgraphs/name/zer0-os/zfi-rinkeby",
    stakeFactory: "0xb1d051095B6b2f6C93198Cbaa9bb7cB2d607215C",
    wildStakingPool: "0xE0Bb298Afc5dC12918d02732c824DA44e7D61E2a",
    lpToken: "0x123c1B5A87E4E11663F2604f3EbCAf4ba86e25E1",
    lpStakingPool: "0xe7BEeedAf11eE695C4aE64A01b24F3F7eA294aB6",
  },
};
