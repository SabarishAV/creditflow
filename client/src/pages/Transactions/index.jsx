import AccountRecordTransaction from "../../components/AccountRecordTransaction";
import style from "./style.module.css";
import axios from "axios";
import getUserId from "../../middleware/getUserId";
import Cookie from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

const Transactions = () => {
  let index = 0;
  const token = Cookie.get("token");
  const userId = getUserId();
  const [transactions, setTransactions] = useState();
  const [totalPages, setTotalPages] = useState();
  const [pageNo, setPageNo] = useState(0);
  const navigate = useNavigate();
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_URL}/transactions/all/${userId}?page=${pageNo}&size=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setTransactions(response.data);
        setTotalPages(response.data.totalPages);
      }
    } catch {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);
  return (
    <>
      {transactions ? (
        <div className={style.accountRecordsContainer}>
          {transactions.content.length >= 1 ? (
            transactions.content?.map((transaction) => (
              <AccountRecordTransaction
                key={transaction.id}
                index={index++}
                transaction={transaction}
                bgColor={
                  transaction.transactionType == "CREDIT"
                    ? "#02a145"
                    : "#f10238"
                }
              />
            ))
          ) : (
            <p>No transactions</p>
          )}
        </div>
      ) : (
        "Loading..."
      )}
      <Pagination
        count={totalPages}
        page={pageNo + 1}
        color="primary"
        onChange={(e, value) => {
          setPageNo(value - 1);
        }}
      />
    </>
  );
};

export default Transactions;
