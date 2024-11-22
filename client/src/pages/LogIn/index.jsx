import "./background.css";
import style from "./style.module.css";
import { LoadingButton } from "@mui/lab";
import FloatingLabelInput from "../../components/InputWithLabel";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorIcon from "@mui/icons-material/Error";
import Cookies from "js-cookie";

const LogIn = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const allInputs = document.querySelectorAll("input");
    allInputs.forEach((input) => {
      input.style.width = "10rem";
    });
  }, []);

  const handleLogin = async () => {
    try {
      const loginData = {
        username,
        password,
      };
      if((username==undefined || username==null)&&(password==undefined || password==null)){
        setUsernameHelperText("This field is mandatory");
        setPasswordHelperText("This field is mandatory");
        throw new Error("field error")
      }
      if(username==undefined || username==null){
        setUsernameHelperText("This field is mandatory");
        throw new Error("field error")
      }
      if(password==undefined || password==null){
        setPasswordHelperText("This field is mandatory");
        throw new Error("field error")
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BE_URL}/user/login/`,
        loginData
      );
      Cookies.set("token",response.data,{expires:1});
      navigate("/")
    } catch(e) {
      if(e.message!="field error"){
        setLoginError(true);
      }
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
      <div className={style.logInPageContainer}>
        <div className={style.heading}>
          <p>creditflow</p>
        </div>
        <div className={style.logIn}>
          <div className={style.logInIntro}>
            <p className={style.logInHeading}>Log In</p>
            <p className={style.logInWelcome}>Welcome, log in to continue</p>
          </div>

          <div className={style.formContainer}>
            <FloatingLabelInput
              onChange={(e) => {
                setUsername(e.target.value);
                setLoginError(false);
                setUsernameHelperText("");
              }}
              labelValue="Username"
              placeholder="username"
              helperText={usernameHelperText}
            />
            <FloatingLabelInput
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginError(false);
                setPasswordHelperText("");
              }}
              labelValue="Password"
              placeholder="password"
              helperText={passwordHelperText}
              ispassword={true}
            />
            <LoadingButton
              onClick={handleLogin}
              style={{
                border: "solid 3px rgba(0, 0, 0, 0.2)",
                paddingInline: "2rem",
                paddingBlock: "0.5rem",
                fontWeight: "600",
                fontSize: "1.1rem",
                marginTop: "1rem",
              }}
            >
              Log In
            </LoadingButton>
            {!loginError ? null : (
              <p className={style.wrongPassword}>
                <ErrorIcon /> Wrong username or password!!
              </p>
            )}
          </div>

          <div className={style.alreadyRegistered}>
            <p>
              Create new account?{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
              >
                sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
