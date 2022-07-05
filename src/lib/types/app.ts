import { providers } from "ethers";

export interface AppProps {
  provider: providers.Web3Provider;
  route: string;
}
