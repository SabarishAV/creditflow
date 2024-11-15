import style from './style.module.css'

const AccountRecord = ()=>{
    return (
        <div className={style.accountRecord}>
            <div className={style.accountRecordSlNo}>
                <p><span>1</span>. </p>
            </div>
            <div className={style.accountRecordName}>
                <p>Xyz Trader</p>
            </div>
            <div className={style.accountRecordBalance}>
                <p>500Rs</p>
            </div>
        </div>
    )
}

export default AccountRecord;