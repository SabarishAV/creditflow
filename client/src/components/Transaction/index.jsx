import style from "./style.module.css";

const Transaction = ()=>{
    return (
        <div className={style.transactionCard}>
            <div className={style.transactionDateContainer}>
                <p>01-02-2024</p>
            </div>
            <div className={style.transactionType}>
                <p>DEBIT</p>
            </div>
            <div className={style.transactionAmountContainer}>
                <p><span>500</span>Rs</p>
            </div>
        </div>
    )
}

export default Transaction;