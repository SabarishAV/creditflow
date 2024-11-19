import './background.css'
import style from './style.module.css'
import { LoadingButton } from '@mui/lab';
import FloatingLabelInput from '../../components/InputWithLabel';   
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LogIn = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
      input.style.width="10rem";
    });
    
  },[])

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
                    <FloatingLabelInput labelValue='Username' placeholder='username' helperText=''/>
                    <FloatingLabelInput labelValue='Password' placeholder='password' helperText='' ispassword={true}/>
                    <LoadingButton style={{border:'solid 3px rgba(0, 0, 0, 0.2)',paddingInline:'2rem',paddingBlock:'0.5rem', fontWeight:'600', fontSize:'1.1rem',marginTop:'1rem'}}>Log In</LoadingButton>
                </div>
            
            <div className={style.alreadyRegistered}>
                <p>Create new account? <span onClick={()=>{navigate('/signup')}}>sign up</span></p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
