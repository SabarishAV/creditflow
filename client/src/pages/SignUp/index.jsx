import './background.css'
import style from './style.module.css'
import { LoadingButton } from '@mui/lab';
import FloatingLabelInput from '../../components/InputWithLabel';   
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignUp = () => {

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
                    <FloatingLabelInput labelValue='Username' placeholder='username' helperText=''/>
                    <FloatingLabelInput labelValue='Email' placeholder='email' helperText=''/>
                    <FloatingLabelInput labelValue='Password' placeholder='password' helperText='' ispassword={true}/>
                    <LoadingButton style={{border:'solid 3px rgba(0, 0, 0, 0.2)',paddingInline:'2rem',paddingBlock:'0.5rem', fontWeight:'600', fontSize:'1.1rem',marginTop:'1rem'}}>Sign Up</LoadingButton>
                </div>
            
            <div className={style.alreadyRegistered}>
                <p>Already registered, <span onClick={()=>{navigate('/login')}}>login</span></p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
