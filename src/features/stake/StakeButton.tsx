import { ViewPoolProps } from "../ui/ViewPool/ViewPool";
import { FC } from "react";
import StakeModal from "./StakeModal";

interface StakeButtonProps extends ViewPoolProps {}

const StakeButton: FC<StakeButtonProps> = ({ poolInstance, poolMetadata }) => (
  <StakeModal
    poolInstance={poolInstance}
    poolMetadata={poolMetadata}
    trigger={"Stake"}
  />
);

export default StakeButton;
