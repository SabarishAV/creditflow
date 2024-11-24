/* eslint-disable react/prop-types */
import style from "./style.module.css";

const AccountRecord = ({ index, accountRecord, onClick, color }) => {
  return (
    <div onClick={onClick} className={style.accountRecord}>
      <div className={style.accountRecordSlNo}>
        <p>
          <span>{index}</span>.{" "}
        </p>
      </div>
      <div className={style.accountRecordName}>
        <p>{accountRecord.accountRecordName}</p>
      </div>
      <div className={style.accountRecordBalance}>
        <p style={{ color: color }}>
          {accountRecord.totalAmount === null ||
          accountRecord.totalAmount === undefined
            ? "0"
            : accountRecord.totalAmount > 0
              ? `+${accountRecord.totalAmount}`
              : accountRecord.totalAmount}
          Rs
        </p>
      </div>
    </div>
  );
};

export default AccountRecord;
