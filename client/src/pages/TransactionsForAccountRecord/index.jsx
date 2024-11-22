import Transaction from "../../components/Transaction";
import style from './style.module.css'

const TransactionsForAccountRecord = ()=>{
    return (
        <div>

            <div className={style.transactionsHeading}>
                <p>All transactions of <span>Sabarish</span></p>
            </div>

            <div className={style.transactionsContainer}>
            <Transaction/>
            <Transaction/>
            <Transaction/>
            <Transaction/>
            <Transaction/>
        </div>

        </div>
    );
}

export default TransactionsForAccountRecord