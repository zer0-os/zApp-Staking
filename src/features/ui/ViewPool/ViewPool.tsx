import { FC, useState } from "react";
import usePoolData from "../../../lib/hooks/usePoolData";
import useUserPoolData from "../../../lib/hooks/useUserPoolData";

import { formatEther } from "@ethersproject/units";
import { PoolMetadata } from "../../../lib/constants/pools";
import { PoolInstance } from "@zero-tech/zfi-sdk";
import { USER_ADDRESS } from "../../../lib/constants/addresses";

/* NOTE: you will need to link zUI */
import Card from "zero-ui/src/components/Card";

import PoolDetail from "../PoolDetail/PoolDetail";

import styles from "./ViewPool.module.scss";

export interface ViewPoolProps {
  poolInstance: PoolInstance;
  poolMetadata: PoolMetadata;
}

// TODO: use real wallet address

const ViewPool: FC<ViewPoolProps> = ({ poolInstance, poolMetadata }) => {
  const { data: poolQueryData, isLoading: isLoadingPoolData } =
    usePoolData(poolInstance);

  const { data: userQueryData, isLoading: isLoadingUserData } = useUserPoolData(
    poolInstance,
    USER_ADDRESS
  );

  const [amt, setAmt] = useState<number>(0);

  // @TODO: better formatting of values below

  const aprAsString =
    poolQueryData?.apr &&
    Number(poolQueryData?.apr.toFixed(2)).toLocaleString() + "%";

  const rewardsClaimableAsString =
    userQueryData?.rewards &&
    Number(Number(formatEther(userQueryData?.rewards))).toLocaleString();

  return (
    <>
      <PoolDetail name={poolMetadata.name} imageUrl={poolMetadata.icon} />
      <div className={styles.Cards}>
        {/* APR card */}
        <Card
          title={"APR"}
          value={{
            text: aprAsString,
            isLoading: isLoadingPoolData,
          }}
        />

        {/* Rewards Claimable card */}
        <Card
          title={`Your Pool Rewards Claimable (${poolMetadata.tokenTicker})`}
          value={{
            text: rewardsClaimableAsString,
            isLoading: isLoadingUserData,
          }}
        />
      </div>
    </>
  );
};

export default ViewPool;
