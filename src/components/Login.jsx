import React from 'react';
import './Login.css';
import logo from './imessage_logo.png';
import { Button } from '@mui/material';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch()

  const signIn = async () => {
    const userCred = signInWithPopup(auth, provider).catch(error => alert(error.message));

  }

  return (
    <div className='login'>
      <div className="login__logo">
        <img src={logo} alt="app logo" />
        <h1>IMessage</h1>
      </div>
      <Button
        onClick={signIn}
      >Sign In</Button>
    </div>
  )
}

export default Login