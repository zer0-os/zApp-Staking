/*
 * Wraps the stake modal to be used in different contexts:
 * - Triggered by a button (pool table row)
 * - Triggered by a dropdown menu item (deposit table row)
 */

import { FC, ReactNode } from "react";
import styles from "../view-pools/PoolRow.module.scss";
import StakeForm from "./StakeForm";
import { PoolInstance } from "@zero-tech/zfi-sdk";
import { PoolMetadata } from "../../lib/constants/pools";
import Modal from "zero-ui/src/components/Modal";

interface StakeModalProps {
  open?: boolean;
  trigger?: string | ReactNode;
  poolInstance: PoolInstance;
  poolMetadata: PoolMetadata;
  onOpenChange?: (open: boolean) => void;
}

const StakeModal: FC<StakeModalProps> = ({
  open,
  trigger,
  poolInstance,
  poolMetadata,
  onOpenChange,
}) => (
  <Modal
    onOpenChange={onOpenChange}
    trigger={trigger}
    open={open}
    className={styles.Modal}
  >
    <StakeForm poolInstance={poolInstance} poolMetadata={poolMetadata} />
  </Modal>
);

export default StakeModal;
