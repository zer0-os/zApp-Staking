import { FC, useState } from "react";
import StakeButton from "../stake/StakeButton";
import { DepositData } from "../../lib/hooks/useAllDeposits";
import DropdownMenu from "zero-ui/src/components/DropdownMenu";
import StakeModal from "../stake/StakeModal";

interface DepositActionProps {
  rowData: DepositData;
}

type Action = "unstake" | "claim" | "stake";

const DepositActions: FC<DepositActionProps> = ({ rowData }) => {
  const [action, setAction] = useState<Action | undefined>();

  const actions = [
    {
      id: "unstake",
      label: "Unstake Deposit",
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
      onSelect: () => setAction("stake"),
    },
  ];

  return (
    <>
      <StakeModal
        poolInstance={rowData.poolInstance}
        poolMetadata={rowData.poolMetadata}
        open={action === "stake"}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setAction(undefined);
          }
        }}
      />
      <DropdownMenu items={actions} alignMenu={"end"} />
    </>
  );
};

export default DepositActions;
