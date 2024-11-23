import "./background.css";
import style from "./style.module.css";
import { LoadingButton } from "@mui/lab";
import FloatingLabelInput from "../../components/InputWithLabel";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

const SignUp = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const allInputs = document.querySelectorAll("input");
    allInputs.forEach((input) => {
      input.style.width = "10rem";
    });
  }, []);

  const handleSignup = async () => {
    try {
      const signUpData = {
        username,
        email,
        password,
      };
      if (!username || !email || !password) {
        setErrorMessage(
          <p className={style.errorMsg}>
            <ErrorIcon />
            All fields are mandatory
          </p>
        );
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BE_URL}/user/register/`,
        signUpData
      );
      setErrorMessage(
        <p className={style.errorMsg} style={{ color: "green" }}>
          <DoneOutlineIcon />
          {response.data}
        </p>
      );
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch {
      setErrorMessage(
        <p className={style.errorMsg}>
          <ErrorIcon />
          username or email already exists
        </p>
      );
    }
  };

  return (
    <div className="background">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <div className={style.signUpPageContainer}>
        <div className={style.heading}>
          <p>creditflow</p>
        </div>
        <div className={style.signUp}>
          <div className={style.signUpIntro}>
            <p className={style.signUpHeading}>Sign Up</p>
            <p className={style.signUpWelcome}>Welcome, sign up to continue</p>
          </div>

          <div className={style.formContainer}>
            <FloatingLabelInput
              labelValue="Username"
              placeholder="username"
              helperText=""
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMessage();
              }}
            />
            <FloatingLabelInput
              labelValue="Email"
              placeholder="email"
              helperText=""
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage();
              }}
            />
            <FloatingLabelInput
              labelValue="Password"
              placeholder="password"
              helperText=""
              ispassword={true}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage();
              }}
            />
            <LoadingButton
              onClick={() => {
                handleSignup();
              }}
              style={{
                border: "solid 3px rgba(0, 0, 0, 0.2)",
                paddingInline: "2rem",
                paddingBlock: "0.5rem",
                fontWeight: "600",
                fontSize: "1.1rem",
                marginTop: "1rem",
              }}
            >
              Sign Up
            </LoadingButton>
            {errorMessage}
          </div>

          <div className={style.alreadyRegistered}>
            <p>
              Already registered,{" "}
              <span
                onClick={() => {
                  navigate("/login");
                }}
              >
                login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
