
import {Token} from "../Main"
import {useEthers, useTokenBalance} from "@usedapp/core"
import {formatUnits} from "@ethersproject/units"
import {BalanceMsg} from "../../components/BalanceMsg"
import {makeStyles} from "@material-ui/core"

export interface WalletBalanceProps {
    token: Token
}

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.spacing(2),
  },
}))

/**
 * @dev this handles the wallet balance
 */

export const WalletBalance = ({token}: WalletBalanceProps) => {
    const {image, address, name} = token
    const {account} = useEthers()
    console.log("account is " + account)
    console.log("address is " + address)
    const tokenBalance = useTokenBalance(address, account)
    console.log(tokenBalance)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    console.log(formattedTokenBalance)
    const classes = useStyles()

    return (
    <div className={classes.contentContainer}>
        <BalanceMsg
            label={`Your un-staked ${name} balance: `}
            amount={formattedTokenBalance}
            tokenImgSrc={image}
        />
    </div>
    )
}