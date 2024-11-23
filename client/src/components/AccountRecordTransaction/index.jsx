/* eslint-disable react/prop-types */
import style from "./style.module.css";

const AccountRecordTransaction = ({ index, transaction }) => {
  return (
    <div className={style.recentTransaction}>
      <p className={style.transactionType}>{transaction.transactionType}</p>
      <div className={style.recentTransactionLower}>
        <p>
          <span>{index + 1}</span>.
        </p>
        <p>{transaction.accountRecordName}</p>
        <p>
          <span>{transaction.amount}</span>
          <span className={style.rs}>Rs</span>
        </p>
      </div>
    </div>
  );
};

export default AccountRecordTransaction;
