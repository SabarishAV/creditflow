import AccountRecordTransaction from "../../components/AccountRecordTransaction";
import style from "./style.module.css";
// import axios from "axios";
// import getUserId from "../../middleware/getUserId";
// import Cookie from "js-cookie";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const Transactions = () => {
    const transaction = {
        "id": 2,
        "account_record_id": 1,
        "accountRecordName":"John Cena",
        "amount": 100.00,
        "created_at": "2024-10-13 09:55:16.00557",
        "transaction_type": "DEBIT",
        "user_id": 2
      };
//   const token = Cookie.get("token");
//   const userId = getUserId();
//   const [transactions, setTransactions] = useState();
//   const navigate = useNavigate();
//   const fetchTransactions = async () => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BE_URL}/transactions/dashboard/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setTransactions(response.data);
//     } catch {
//       navigate("/login");
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//     console.log(transactions);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
  return <div className={style.allTransactionsContainer}>
    <AccountRecordTransaction index={1} transaction={transaction} bgColor="red"/>
    <AccountRecordTransaction index={1} transaction={transaction} bgColor="red"/>
    <AccountRecordTransaction index={1} transaction={transaction} bgColor="red"/>
    <AccountRecordTransaction index={1} transaction={transaction} bgColor="red"/>
    <AccountRecordTransaction index={1} transaction={transaction} bgColor="red"/>
  </div>;
};

export default Transactions;
