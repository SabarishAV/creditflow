import style from "./style.module.css";

const AccountRecordTransaction = () => {
  return (
    <div className={style.recentTransaction}>
      <p className={style.transactionType}>DEBIT</p>
      <div className={style.recentTransactionLower}>
        <p>
          <span>1</span>.
        </p>
        <p>John Doe</p>
        <p>
          <span>5000</span>
          <span className={style.rs}>Rs</span>
        </p>
      </div>
    </div>
  );
};

export default AccountRecordTransaction;
