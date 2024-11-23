import { useEffect, useState } from "react";
import AccountRecordTransaction from "../../components/AccountRecordTransaction";
import getUserId from "../../middleware/getUserId";
import style from "./style.module.css";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState();
  const token = Cookie.get("token");
  const userId = getUserId();
  const navigate = useNavigate()
  let index = 0;

  const fetchDashboard = async () => {
    try{
      const response = await axios.get(
        `${import.meta.env.VITE_BE_URL}/transactions/dashboard/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDashboardData(response.data);
    }catch{
      navigate("/login")
    }
  };

  useEffect(() => {
    try{
      fetchDashboard();
    }catch{
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={style.dasboardContainer}>
        <div className={style.amountContainer}>
          <div className={style.amountContainerLeft}>
            <p className={style.amountContainerLeftBalanceHeading}>
              Recieved Today
            </p>
            <p className={style.amountContainerLeftBalance}>
              <span>
                {!dashboardData
                  ? "Loading..."
                  : dashboardData.todaysTotalTransaction}
              </span>{" "}
              Rs
            </p>
          </div>
          <div className={style.amountContainerRight}>
            <p className={style.amountContainerRightBalanceHeading}>
              Aggregate Balance
            </p>
            <p className={style.amountContainerRightBalance}>
              <span>
                {!dashboardData ? "Loading..." : dashboardData.balance}
              </span>{" "}
              Rs
            </p>
          </div>
        </div>

        <div className={style.dashboardContentContainer}>
          <div className={style.dashboardContentHeadingContainer}>
            <p>Recent Transactions</p>
          </div>
          <div className={style.dashboardContentDetailsConatiner}>
            {!dashboardData ? (
              <p>Loading...</p>
            ) : (
              <>
                {dashboardData.transactions?.map((transaction) => (
                  <AccountRecordTransaction
                  bgColor={transaction.transactionType=="CREDIT"?"#02a145":"#f10238"}
                    key={transaction.id}
                    index={index++}
                    transaction={transaction}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
