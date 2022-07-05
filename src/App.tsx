/**
 * NOTE: You will need to `npm link` zUI before this repo
 * will build or run.
 */

import { FC } from "react";
import { AppProps } from "./lib/types/app";

import { parseRoute } from "./lib/util/routes";

import TabNav, { Tab } from "zero-ui/src/components/TabNav";

import PoolsPage from "./pages/Pools";
import DepositsPage from "./pages/Deposits";
import { useQueryClient } from "react-query";

const App: FC<AppProps> = ({ provider, route }) => {
  console.log("prov (zfi-dapp):", provider);
  return (
    <main>
      <TabNav
        defaultValue={"Pools"}
        tabs={[
          {
            text: "Pools",
            to: "/pools",
            content: <PoolsPage />,
          },
          {
            text: "Deposits",
            to: "/deposits",
            content: <DepositsPage />,
          },
        ]}
      />
    </main>
  );
};

export default App;
