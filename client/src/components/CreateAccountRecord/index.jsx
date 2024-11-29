import style from "./style.module.css";
import { Input } from "@mui/base/Input";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import getUserId from "../../middleware/getUserId";
import Cookie from "js-cookie";
import axios from "axios";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// eslint-disable-next-line react/prop-types
const CreateAccountRecord = ({ display, setDisplay }) => {
  const [clientName, setClientName] = useState();
  const [apiResponse, setApiResponse] = useState();
  const token = Cookie.get("token");
  const userId = getUserId();

  const createAccountRecord = async () => {
    try {
      if (!clientName) {
        console.log("client empty");
        return;
      }
      await axios.post(
        `${import.meta.env.VITE_BE_URL}/accountrecords/`,
        {
          clientName,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApiResponse(
        <p style={{ color: "green" }} className={style.apiResponseMessage}>
          <DoneIcon /> Client created successfully!!
        </p>
      );
      setTimeout(() => {
        setDisplay("flex");
        window.location.reload();
      }, 1500);
    } catch {
      setApiResponse(
        <p style={{ color: "red" }} className={style.apiResponseMessage}>
          <ErrorOutlineIcon /> Something went wrong!!
        </p>
      );
    }
  };

  return (
    <>
      <div
        style={{ display: display }}
        className={style.createAccountRecordContainer}
      >
        <CloseIcon
          style={{ position: "absolute", right: "10", top: "10" }}
          onClick={() => {
            setDisplay("flex");
          }}
        />
        <div className={style.createAccountRecordHeading}>
          <p>Create Client</p>
        </div>
        <div className={style.createAccountRecordForm}>
          <div className={style.inputAndLabel}>
            <label htmlFor="">Client name</label>
            <Input
              placeholder="Enter client name here"
              required
              className={style.clientNameInput}
              onChange={(e) => {
                setClientName(e.target.value);
                setApiResponse();
              }}
            />
            <Button
              variant="outlined"
              onClick={() => {
                createAccountRecord();
              }}
            >
              Submit
            </Button>
            {apiResponse}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccountRecord;
