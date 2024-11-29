import CloseIcon from "@mui/icons-material/Close";
import style from "./style.module.css";
import { Input } from "@mui/base/Input";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const CreateTransaction = ({ display, setDisplay }) => {
  const [transactionAmountError, setTransactionAmountError] = useState();
  // eslint-disable-next-line no-unused-vars
  const [transactionTypeError, setTransactionTypeError] = useState();
  const [transactionApiResponse, setTransactionApiResponse] = useState();
  const [amount, setAmount] = useState();
  // eslint-disable-next-line no-unused-vars
  const [transactionType, setTransactionType] = useState();
  // use .inputError class

  const createTransaction = async () => {
    if (parseFloat(amount) <= 0) {
      setTransactionAmountError(
        <p className={style.inputError}>
          <ErrorOutlineIcon /> Amount must be greater than 0
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
