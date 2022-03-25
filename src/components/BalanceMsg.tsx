
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    container: {
        display: "inline-grid",
        gridTemplateColumns: "auto auto auto",
        gap: theme.spacing(1),
        alignItems: "center",
        background: 'linear-gradient(45deg, #36FFA8 30%, #00DE7E 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 1px rgba(156, 210, 255, .3)',
        color: 'black',
        height: 48,
        padding: '0 30px',
    },
    tokenImg: {
        width: "16px"
    },
    amount: {
        fontWeight: 700
    }
}))


interface BalanceMsgProps {
    label: string;
    amount: number;
    tokenImgSrc: string;
}

export const BalanceMsg = ({label, amount, tokenImgSrc}: BalanceMsgProps) => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <div>{label}</div>
            <div className={classes.amount}>{amount}</div>
            <img className={classes.tokenImg} src={tokenImgSrc} alt="token logo"/>
        </div>
    )

}