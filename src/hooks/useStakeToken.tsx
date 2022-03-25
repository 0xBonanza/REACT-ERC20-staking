// we want to run two functions sequentially -> first approve then stake

import {useEthers, useContractFunction} from "@usedapp/core"
import ContributorLender from "../chain-info/contracts/ContributorLender.json"
import ERC20 from "../chain-info/interfaces/IERC20.json"
import networkMapping from "../chain-info/deployments/map.json"
import {Contract} from "@ethersproject/contracts"
import {constants, utils} from "ethers"
import {useEffect, useState} from "react"

export const useStakeTokens = (tokenAddress: string) => {
    // addres

    // chainId
    const {chainId} = useEthers()

    // abi => remember we saved it
    const {abi} = ContributorLender
    const contributorLenderAddress = chainId ? networkMapping[String(chainId)]["ContributorLender"][0] : constants.AddressZero
    const contributorLenderInterface = new utils.Interface(abi)
    const contributorLenderContract = new Contract(contributorLenderAddress, contributorLenderInterface)

  const { send: stakeTokensSend, state: stakeTokensState } =
    useContractFunction(contributorLenderContract, "poolDeposit", {
      transactionName: "Stake tokens",
    })

  const erc20Interface = new utils.Interface(ERC20.abi)

  const tokenContract = new Contract(tokenAddress, erc20Interface)

  const { send: approveErc20Send, state: approveErc20State } =
    useContractFunction(tokenContract, "approve", {
      transactionName: "Approve ERC20 transfer",
    })

  const [amountToStake, setAmountToStake] = useState("0")

  useEffect(() => {
    console.log(approveErc20State.status)
    if (approveErc20State.status === "Success") {
        console.log(tokenAddress)
        console.log(amountToStake)
        console.log(String(chainId))
        stakeTokensSend(tokenAddress, amountToStake)
    }
    // the dependency arry
    // the code inside the useEffect anytime
    // anything in this list changes
    // if you want something to run when the component first runs
    // you just have a blank list
  }, [approveErc20State, amountToStake, tokenAddress]) // eslint-disable-line react-hooks/exhaustive-deps

  const send = (amount: string) => {
    setAmountToStake(amount)
    return approveErc20Send(contributorLenderAddress, amount)
  }

  const [state, setState] = useState(approveErc20State)

  useEffect(() => {
    if (approveErc20State.status === "Success") {
      setState(stakeTokensState)
    } else {
      setState(approveErc20State)
    }
  }, [approveErc20State, stakeTokensState])

  return { send, state }

}