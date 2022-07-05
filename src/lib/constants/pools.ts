/* For zFi-app 0.1.0, the pools are hardcoded.
 * This will be expanded in future as the protocol-level
 * stuff is worked out.
 */

import wildPoolIcon from "../../assets/wild-pool.png";
import lpPoolIcon from "../../assets/lp-pool.png";

export interface PoolMetadata {
  name: string;
  icon: string;

  tokenTicker: string;
  tokenPurchaseUrl: string;
}

export const POOL_METADATA = {
  WILD_POOL: {
    name: "Stake WILD",
    icon: wildPoolIcon,
    tokenTicker: "WILD",
    tokenPurchaseUrl: "https://zer0.io/", // @TODO: get real token purchase URL
  },
  LP_POOL: {
    name: "Farm WILD - WETH LP",
    icon: lpPoolIcon,
    tokenTicker: "LP",
    tokenPurchaseUrl: "https://zer0.io/", // @TODO: get real token purchase URL
  },
};
