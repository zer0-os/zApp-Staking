import { useQuery } from "react-query";
import { BigNumber, providers } from "ethers";
import { PoolInstance } from "@zero-tech/zfi-sdk";

/**
 * Checks if a given user (provider) has approved
 * pool spending over the specified amount.
 * @param provider of the account to check
 * @param amountToApprove number of tokens to check allowance against
 * @param poolInstance pool to check approval for
 */
const usePoolSpendingAllowance = (
  provider: providers.Web3Provider,
  amountToApprove: number,
  poolInstance: PoolInstance
) => {
  // @TODO: include account number in the query ID
  return useQuery(`check-approval-${poolInstance.address}`, async () => {
    const allowance = await poolInstance.allowance(provider.getSigner());
    return allowance.lt(BigNumber.from(amountToApprove));
  });
};

export default usePoolSpendingAllowance;
