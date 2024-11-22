import AccountRecord from "../../components/AccountRecord";
import style from './style.module.css'

const Balance = ()=>{
    return (
        <div className={style.accountRecordsContainer}>
            <AccountRecord/>
            <AccountRecord/>
            <AccountRecord/>
            <AccountRecord/>
            <AccountRecord/>
        </div>
    );
}

export default Balance;