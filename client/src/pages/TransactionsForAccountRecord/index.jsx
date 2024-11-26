import { useEffect, useState } from "react";
import Transaction from "../../components/Transaction";
import getUserId from "../../middleware/getUserId";
import style from "./style.module.css";
import Cookie from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "@mui/material/Pagination";

const TransactionsForAccountRecord = () => {
  const token = Cookie.get("token");
  const userId = getUserId();
  const { accountRecordId } = useParams();
  const [pageData, setPageData] = useState();
  const [accountRecordName, setAccountRecordName] = useState();
  const [totalPages, setTotalPages] = useState();
  const [pageNo, setPageNo] = useState(0);
  const navigate = useNavigate();
  const fetchPageData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_URL}/transactions/${accountRecordId}?userId=${userId}&page=${pageNo}&size=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setPageData(response.data);
        setAccountRecordName(response.data.accountRecordName);
        setTotalPages(response.data.transactions.totalPages);
      }
    } catch {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  return (
    <div>
      <div className={style.transactionsHeading}>
        <p>
          Transactions of <span>{accountRecordName}</span>
        </p>
      </div>

      <div className={style.transactionsContainer}>
        {pageData?.transactions?.content?.map((transaction) => (
          <Transaction
            key={transaction.id}
            bgColor={
              transaction.transactionType == "CREDIT" ? "#02a145" : "#f10238"
            }
            transaction={transaction}
          />
        ))}
      </div>
      <Pagination
        count={totalPages}
        page={pageNo + 1}
        color="primary"
        onChange={(e, value) => {
          setPageNo(value - 1);
        }}
      />
    </div>
  );
};

export default TransactionsForAccountRecord;
