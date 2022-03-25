import { useContractCall, useEthers } from "@usedapp/core"
import ContributorLender from "../chain-info/contracts/ContributorLender.json"
import { utils, BigNumber, constants } from "ethers"
import networkMapping from "../chain-info/deployments/map.json"

/**
 * Get the staking balance of a certain token by the user in our ContributorLender contract
 * @param address - The contract address of the token
 */
export const useStakingBalance = (address: string): BigNumber | undefined => {
  const { account, chainId } = useEthers()

  const { abi } = ContributorLender
  const ContributorLenderContractAddress = chainId ? networkMapping[String(chainId)]["ContributorLender"][0] : constants.AddressZero

  const ContributorLenderInterface = new utils.Interface(abi)

  const [stakingBalance] =
    useContractCall({
      abi: ContributorLenderInterface,
      address: ContributorLenderContractAddress,
      method: "contributions",
      args: [address, account],
    }) ?? []

  return stakingBalance
}