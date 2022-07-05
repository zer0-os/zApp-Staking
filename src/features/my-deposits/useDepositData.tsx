/*
 * Created a hook for handling deposit data/actions
 * which are shared between row and grid components
 */
import { DepositData } from "../../lib/hooks/useAllDeposits";
import StakeButton from "../stake/StakeButton";
import { useState } from "react";

type Action = "unstake" | "stake" | "claim";

const useDepositData = (rowData: DepositData) => {
  const [action, setAction] = useState<Action | undefined>();

  const actions = [
    {
      id: "unstake",
      label: (
        <StakeButton
          poolInstance={rowData.poolInstance}
          poolMetadata={rowData.poolMetadata}
        />
      ),
      onSelect: () => setAction("unstake"),
    },
    {
      id: "claim",
      label: "Claim Pool Rewards",
      onSelect: () => setAction("unstake"),
    },
    {
      id: "stake",
      label: "Stake in Pool",
      onSelect: () => console.log("stake"),
    },
  ];

  return {
    action,
    actions,
  };
};

export default useDepositData;
