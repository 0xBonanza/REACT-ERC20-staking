import {useEthers} from "@usedapp/core"
import helperConfig from "../helper-config.json"
import brownieConfig from "../brownie-config.json"
import {constants} from "ethers"
import {YourWallet} from "./yourWallet"
import eth from "../eth.png"
import dai from "../dai.png"
import { Snackbar, Typography, makeStyles, Box } from "@material-ui/core"
import { ContributorLenderContract } from "./lenderContract"
import Alert from "@material-ui/lab/Alert"
import {
  ConnectionRequiredMsg,
} from "."
import cover from "../0x.png"
import networkMapping from "../chain-info/deployments/map.json"

export type Token = {
    image: string
    address: string
    name: string
}

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.white,
    textAlign: "center",
    padding: theme.spacing(4),
  },
    list: {
    marginBottom: 12,
    display: "in-line",
    listStyleType: "none",
  },
  img: {
        width: "52px",
    },
  box:{
    display: 'flex',
    alignItems: "center",
  },
  footer: {
    display: 'flex',
    color: "grey",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    fontSize: 11
  },
  instruction: {
    background: 'linear-gradient(45deg, #FFE9C6 30%, #FFD99F 90%)'
  }
}))

export const Main = () => {
    const { account } = useEthers()
    const {chainId} = useEthers()
    console.log(chainId)
    const networkName = chainId ? helperConfig[chainId] : "dev"
    const classes = useStyles()
    const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
    const daiTokenAddress = chainId ? brownieConfig["networks"][networkName]["dai_token"] : constants.AddressZero
    const url = "https://kovan.etherscan.io/address/0xE13A0106E407Aec6F1AdC079d36ca0E806826CBc"
    const isConnected = account !== undefined

    const supportedTokens: Array<Token>= [
        {
        image: eth,
        address: wethTokenAddress,
        name: "WETH"
        },
        {
        image: dai,
        address: daiTokenAddress,
        name: "DAI"
        },
    ]

  return (
    <Box>
        <div className={classes.box}>
            <img className={classes.img} src={cover} alt="0x"/>
            <h1>Looking for some lazy return? <u>Stake</u> on Aave with us!</h1>
        </div>
        <div >
            Some of the things you need to know:
                <ul>
                    <li className={classes.list}><span className={classes.instruction}>ERC20</span> Select the ERC20 token you'd like to stake on Aave V2.</li>
                    <li className={classes.list}><span className={classes.instruction}>STAKE</span> Stake any amount in one click.</li>
                    <li className={classes.list}><span className={classes.instruction}>UNSTAKE</span> Unstake your stake at any point in time.</li>
                    <li className={classes.list}><span className={classes.instruction}>GAIN</span> Actually you only get back what you staked (this was originally created for charity).</li>
              </ul>
        </div>

        <span>Get an overview of the contract on <a href={url}>Etherscan</a> or get some Faucet Kovan ETH on <a href="https://faucets.chain.link/">Chainlink</a> and swap them on <a href="https://app.uniswap.org/#/swap?chain=kovan">Uniswap</a> to give it a try! Just note that this is the address for the <a href="https://kovan.etherscan.io/address/0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD">Faucet DAI</a> you can stake here.</span>
        {isConnected ?
            <>
              <YourWallet supportedTokens={supportedTokens} />
              <ContributorLenderContract supportedTokens={supportedTokens} />
            </>
        : <ConnectionRequiredMsg />
        }
        <div className={classes.footer}>
            <footer><p>© 2022 by 0xBonanza, visit <a href="http://0xbonanza.github.io/">our Github</a> for more info!</p></footer>
        </div>
    </Box>
  )

}