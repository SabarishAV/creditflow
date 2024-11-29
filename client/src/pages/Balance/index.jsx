import { useState, useEffect } from "react";
import AccountRecord from "../../components/AccountRecord";
import style from "./style.module.css";
import Cookie from "js-cookie";
import getUserId from "../../middleware/getUserId";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CreateAccountRecord from "../../components/CreateAccountRecord";

const Balance = () => {
  const [display, setDisplay] = useState("flex");
  const [balancePageData, setBalancePageData] = useState();
  const [totalPages, setTotalPages] = useState();
  const [pageNo, setPageNo] = useState(0);
  const token = Cookie.get("token");
  const userId = getUserId();
  const navigate = useNavigate();
  let index = 0;

  const toggleDisplay = () => {
    setDisplay(display === "none" ? "flex" : "none");
  };

  const fetchBalacePageData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_URL}/transactions/balance/${userId}/${pageNo}/5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setBalancePageData(response.data);
        setTotalPages(response.data.totalPages);
      }
    } catch {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchBalacePageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  return (
    <>
      {!balancePageData ? (
        "Loading..."
      ) : (
        <>
          <CreateAccountRecord
            display={display === "none" ? "flex" : "none"}
            setDisplay={setDisplay}
          />
          <div
            style={{ display: display }}
            className={style.accountRecordsContainer}
          >
            <Button
              className={style.addNewClientButton}
              variant="contained"
              onClick={() => {
                toggleDisplay();
              }}
            >
              <AddIcon />
              Add New Client
            </Button>
            {balancePageData.content.length >= 1 ? (
              balancePageData.content?.map((accountRecord) => (
                <AccountRecord
                  key={accountRecord.accountRecordId}
                  index={++index}
                  accountRecord={accountRecord}
                  color={accountRecord.totalAmount > 0 ? "#02a145" : "#f10238"}
                  onClick={() => {
                    navigate(`/balance/${accountRecord.accountRecordId}`);
                  }}
                />
              ))
            ) : (
              <p>No clients</p>
            )}
          </div>
        </>
      )}
      <Pagination
        style={{ display: display }}
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

export default Balance;
