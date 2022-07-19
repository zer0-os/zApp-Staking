import { ViewPoolProps } from "../ui/ViewPool/ViewPool";
import { FC } from "react";

import FormInputs from "../ui/FormInputs/FormInputs";
import { USER_ADDRESS } from "../../lib/constants/addresses";
import useUserPoolTokenBalance from "../../lib/hooks/useUserPoolTokenBalance";
import { formatEther } from "ethers/lib/utils";
import ApprovePoolSpendingForm from "../ui/ApprovePoolSpendingForm/ApprovePoolSpendingForm";
import useWeb3 from "../../lib/hooks/useWeb3";
import useStakeForm, { StakeFormStep as Step } from "./useStakeForm";
import Wizard from "zero-ui/src/components/Wizard/Wizard";

interface StakeFormProps extends ViewPoolProps {}

const StakeForm: FC<StakeFormProps> = (props) => {
  /**
   * Get user pool token balance
   */
  const { data: queryData, isLoading } = useUserPoolTokenBalance(
    USER_ADDRESS,
    props.poolInstance
  );

  const { amount, step, onConfirmAmount, onStartTransaction, error } =
    useStakeForm(props.poolInstance);
  const { provider } = useWeb3();

  const onCancel = () => {
    // @TODO: implement cancel
    console.log("cancel");
  };

  // @TODO: show Connect Wallet modal
  // @TODO: add UI for Step.COMPLETE

  let content;
  switch (step) {
    case Step.CONNECT_WALLET:
      content = <>Connect a wallet</>;
      break;
    case Step.COMPLETE:
      content = <>COMPLETE</>;
      break;
    case Step.AMOUNT:
    case Step.WAITING_FOR_WALLET:
      content = (
        <FormInputs
          action={"stake"}
          {...props}
          error={error}
          onSubmit={onConfirmAmount}
          isTransactionPending={step !== Step.AMOUNT}
          balances={[
            {
              label: `Your Balance (${props.poolMetadata.tokenTicker})`,
              isLoading,
              value:
                queryData && Number(formatEther(queryData)).toLocaleString(),
            },
          ]}
        />
      );
      break;
    case Step.PROCESSING:
      content = (
        <Wizard.Loading message={"Your transaction is being processed..."} />
      );
      break;
    case Step.APPROVE:
      content = (
        <ApprovePoolSpendingForm
          poolInstance={props.poolInstance}
          provider={provider!}
          onCancel={onCancel}
          onComplete={onStartTransaction}
          /* Asserting not null because form validation
             prevents us from getting this far if amount === undefined */
          amountToApprove={amount!}
        />
      );
  }

  return <form>{content}</form>;
};

export default StakeForm;
