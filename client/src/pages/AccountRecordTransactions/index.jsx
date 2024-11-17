import AccountRecordTransaction from "../../components/AccountRecordTransaction";
import style from './style.module.css'

const AccountRecordTransactions = ()=>{
    return (
        <div className={style.allTransactionsContainer}>
            <AccountRecordTransaction/>
            <AccountRecordTransaction/>
            <AccountRecordTransaction/>
            <AccountRecordTransaction/>
            <AccountRecordTransaction/>
            <AccountRecordTransaction/>
            <AccountRecordTransaction/>
            <AccountRecordTransaction/>
            <AccountRecordTransaction/>
            <AccountRecordTransaction/>
        </div>
    );
}


export default AccountRecordTransactions;