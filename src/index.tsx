/**
 * This file:
 * - Wraps out App in necessary context providers
 * - Exports the root component
 */

import { AppProps } from "./lib/types/app";
import App from "./App";

import { QueryClient, QueryClientProvider } from "react-query";
import ZFiSdkProvider from "./lib/providers/ZFiSdkProvider";
import ChainGate from "./lib/util/ChainGate";
import Web3Provider from "./lib/providers/Web3Provider";
import ZnsSdkProvider from "./lib/providers/ZnsSdkProvider";

const queryClient = new QueryClient();

const Index = ({ provider, route }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Web3Provider provider={provider}>
      <ChainGate chainId={provider?._network?.chainId ?? 1}>
        <ZnsSdkProvider provider={provider}>
          <ZFiSdkProvider provider={provider}>
            <App provider={provider} route={route} />
          </ZFiSdkProvider>
        </ZnsSdkProvider>
      </ChainGate>
    </Web3Provider>
  </QueryClientProvider>
);

export default Index;
