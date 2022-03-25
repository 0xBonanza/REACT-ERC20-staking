import { useContractFunction, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/contracts/ContributorLender.json"
import { utils, constants } from "ethers"
import {Contract} from '@usedapp/core/node_modules/@ethersproject/contracts'
import networkMapping from "../chain-info/deployments/map.json"

/**
 * Expose { send, state } object to facilitate unstaking the user's tokens from the TokenFarm contract
 */
export const useUnstakeTokens = () => {
  const { chainId } = useEthers()

  const { abi } = TokenFarm
  const contributorLenderContractAddress = chainId ? networkMapping[chainId]["ContributorLender"][0] : constants.AddressZero

  const contributorLenderInterface = new utils.Interface(abi)

  const contributorLenderContract = new Contract(
    contributorLenderContractAddress,
    contributorLenderInterface
  )

  return useContractFunction(contributorLenderContract, "poolRefund", {
    transactionName: "Unstake tokens",
  })
}