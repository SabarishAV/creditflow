
import AccountRecordTransaction from "../AccountRecordTransaction";
import style from "./style.module.css";

const Dashboard = () => {
  return (
    <>
      <div className={style.dasboardContainer}>

        <div className={style.amountContainer}>
          <div className={style.amountContainerLeft}>
            <p className={style.amountContainerLeftBalanceHeading}>
              Recieved Today
            </p>
            <p className={style.amountContainerLeftBalance}>
              <span>3500</span> Rs
            </p>
          </div>
          <div className={style.amountContainerRight}>
            <p className={style.amountContainerRightBalanceHeading}>
              Aggregate Balance
            </p>
            <p className={style.amountContainerRightBalance}>
              <span>10000</span> Rs
            </p>
          </div>
        </div>

        <div className={style.dashboardContentContainer}>
          <div className={style.dashboardContentHeadingContainer}>
            <p>Recent Transactions</p>
          </div>
          <div className={style.dashboardContentDetailsConatiner}>
            <AccountRecordTransaction/>
            <AccountRecordTransaction/>
            <AccountRecordTransaction/>
            <AccountRecordTransaction/>
            <AccountRecordTransaction/>
          </div>
        </div>

      </div>
    </>
  );
};
export default Dashboard;
