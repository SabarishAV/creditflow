/* eslint-disable react/prop-types */
import style from "./style.module.css";

const Transaction = ({bgColor, transaction})=>{
    const dateString=transaction.createdAt;
    const dateObj = new Date(dateString);
    const date = dateObj.toLocaleDateString("en-CA");
    // date is in yyyy-mm-dd format
    //below code is to convert it to dd-mm-yyyy
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    return (
        <div style={{backgroundColor:bgColor}} className={style.transactionCard}>
            <div className={style.transactionDateContainer}>
                <p>{formattedDate}</p>
            </div>
            <div className={style.transactionType}>
                <p>{transaction.transactionType}</p>
            </div>
            <div className={style.transactionAmountContainer}>
                <p><span>{transaction.amount}</span>Rs</p>
            </div>
        </div>
    )
}

export default Transaction;