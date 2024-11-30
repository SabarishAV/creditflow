import CloseIcon from "@mui/icons-material/Close";
import style from "./style.module.css";
import { Input } from "@mui/base/Input";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import getUserId from "../../middleware/getUserId";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

// eslint-disable-next-line react/prop-types
const CreateTransaction = ({ display, setDisplay }) => {
  const [transactionAmountError, setTransactionAmountError] = useState();
  const [transactionTypeError, setTransactionTypeError] = useState();
  const [transactionApiResponse, setTransactionApiResponse] = useState();
  const [amount, setAmount] = useState();
  const [transactionType, setTransactionType] = useState();

  const userId = getUserId();
  const { accountRecordId } = useParams();
  const token = Cookie.get("token");

  const createTransaction = async () => {
    try {
      if (!amount) {
        setTransactionAmountError(
          <p className={style.inputError}>
            <ErrorOutlineIcon /> This field is mandatory
          </p>
        );
        return;
      }
      if (!transactionType) {
        setTransactionTypeError(
          <p className={style.inputError}>
            <ErrorOutlineIcon /> This field is mandatory
          </p>
        );
        return;
      }
      if (parseFloat(amount) <= 0) {
        setTransactionAmountError(
          <p className={style.inputError}>
            <ErrorOutlineIcon /> Amount must be greater than 0
          </p>
        );
        return;
      }
      await axios.post(
        `${import.meta.env.VITE_BE_URL}/transactions/`,
        {
          userId,
          accountRecordId,
          amount,
          transactionType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactionApiResponse(
        <p style={{ color: "green" }} className={style.inputError}>
          <DoneIcon /> Transaction created successfully!!
        </p>
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch {
      setTransactionApiResponse(
        <p className={style.inputError}>
          <ErrorOutlineIcon /> Something went wrong!!
        </p>
      );
    }
  };

  return (
    <>
      <div
        style={{ display: display }}
        className={style.createTransactionContainer}
      >
        <CloseIcon
          style={{ position: "absolute", right: "10", top: "10" }}
          onClick={() => {
            setDisplay("flex");
          }}
        />
        <div className={style.createTransactionHeading}>
          <p>Create New Transaction</p>
        </div>
        <div className={style.inputsContainer}>
          <div className={style.createTransactionInput}>
            <label htmlFor="">Transaction amount</label>
            <Input
              placeholder="1000"
              type="number"
              min="0"
              required
              onChange={(e) => {
                setAmount(e.target.value);
                setTransactionApiResponse();
                setTransactionAmountError();
              }}
            />
            {transactionAmountError}
          </div>
          <div className={style.createTransactionInput}>
            <label htmlFor="">Transaction type</label>
            <select
              required
              onChange={(e) => {
                setTransactionType(e.target.value);
                setTransactionApiResponse();
                setTransactionTypeError();
              }}
            >
              <option value="">Select an option</option>
              <option value="DEBIT">DEBIT</option>
              <option value="CREDIT">CREDIT</option>
            </select>
            {transactionTypeError}
          </div>
        </div>
        <Button
          className={style.transactionSubmitButton}
          variant="outlined"
          onClick={() => {
            createTransaction();
          }}
        >
          Submit
        </Button>
        {transactionApiResponse}
      </div>
    </>
  );
};

export default CreateTransaction;
