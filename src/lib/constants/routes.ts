export enum ROUTE_NAMES {
  STAKING,
  POOLS,
  DEPOSITS,
}

export const ROUTES: {
  [route in ROUTE_NAMES]: { name: string; slug: string };
} = {
  [ROUTE_NAMES.STAKING]: { name: "Staking", slug: "/staking" },
  [ROUTE_NAMES.POOLS]: { name: "Pools", slug: "/pools" },
  [ROUTE_NAMES.DEPOSITS]: { name: "Deposits", slug: "/deposits" },
};
