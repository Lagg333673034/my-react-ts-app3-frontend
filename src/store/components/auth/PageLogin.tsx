import './PageLogin.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authAPI } from '../../api/auth';
import { IUser } from '../../type/user';
import { userSetup } from '../../reducers/siteSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { PAGE_MAIN_ROUTE, PAGE_REGISTRATION_ROUTE } from '../../routes/routes';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {GoogleLogin} from '@react-oauth/google';
import {Card, SignInContainer} from './MUI';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {jwtDecode} from 'jwt-decode';

const PageLogin = () => {
  const {idTest,uuid} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [successMessage,setSuccessMessage] = useState<string>('');
  const [errorMessage,setErrorMessage] = useState<string>('');
  const [loginUsingEmailPassword] = authAPI.useLoginUsingEmailPasswordMutation();
  const [loginUsingGoogle] = authAPI.useLoginUsingGoogleMutation();
  const [restorePasswordSendEmail] = authAPI.useRestorePasswordSendEmailMutation();

  const signInUsingEmailPassword = async () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    setSuccessMessage('');
    setErrorMessage('');

    const result = await loginUsingEmailPassword({email: email.value,password: password.value} as IUser) as any;

    if(result.data){
      setSuccessMessage(result.data.message);
      dispatch(userSetup({
        userEmail:result.data.user.email,
        token:result.data.token
      }));
      navigate(PAGE_MAIN_ROUTE);
    }
    if(result.error){
      setErrorMessage(result.error.data.message);
    }
  };

  const [modalForgotPasswordOpen,setModalForgotPasswordOpen] = useState<boolean>(false);
  const modalContinue = async () => {
    const emailToRestorePassword = document.getElementById('emailToRestorePassword') as HTMLInputElement;
    setSuccessMessage('');
    setErrorMessage('');
    modalClose();

    const resultRestorePassword = await restorePasswordSendEmail(emailToRestorePassword.value) as any;
    //console.log('emailToRestorePassword='+emailToRestorePassword.value);

    if(resultRestorePassword.data){
      setSuccessMessage(resultRestorePassword.data.message);
    }
    if(resultRestorePassword.error){
      setErrorMessage(resultRestorePassword.error.data.message);
    }
  }
  const modalClose = () =>{
    setModalForgotPasswordOpen(false);
  }

  document.addEventListener('keyup', (event) => {
    if(event.key == 'Enter'){
      signInUsingEmailPassword();
    }
  });

  const {userAuth} = useSelector((state: RootState) => state.siteReducer);
  useEffect(()=>{
    if(!userAuth){
      let firstLocation = window.location.pathname;
      let firstLocationRegex = new RegExp('^(\/ready-for-pass\/)([0-9]){1,}(\/)([0-9a-z]){8}-([0-9a-z]){4}-([0-9a-z]){4}-([0-9a-z]){4}-([0-9a-z]){12}$');
      let regexResult = firstLocationRegex.test(firstLocation)
      if(regexResult){
        localStorage.setItem('required-location',window.location.pathname);
      }
    }
  },[userAuth])

  const signInUsingGoogleOnSuccess = async (credentialResponse:any) => {
    //console.log(credentialResponse)
    //console.log(jwtDecode(String(credentialResponse.credential)))
    const userCredentialEncoded = credentialResponse?.credential;
    const userCredentialDecoded = jwtDecode(userCredentialEncoded) as any;
    const userEmail =  userCredentialDecoded?.email;

    if(userEmail && userEmail.length > 0){
      const result = await loginUsingGoogle(String(userEmail)) as any;

      if(result?.data){
        setSuccessMessage(result?.data?.message);
        dispatch(userSetup({
          userEmail:result.data.user.email,
          token:result.data.token
        }));
        navigate(PAGE_MAIN_ROUTE);
      }
      if(result?.error){
        setErrorMessage(result?.error?.data?.message);
      }
    }
  }
  const signInUsingGoogleOnError = () => {
    setErrorMessage("Google login failed");
  }

  return(
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography className='titleName'>Sign in</Typography>
          <Box component="section" sx={{display: 'flex',flexDirection: 'column',width: '100%',gap: 2,}}>
            <FormControl className='inputs'>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField fullWidth variant="outlined" color='primary' placeholder="your@email.com"
                id="email" type="email" autoComplete="email" />
            </FormControl>
            <FormControl className='inputs'>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField fullWidth variant="outlined" color='primary' placeholder="••••••"
                id="password" type="password" autoComplete="password" />
            </FormControl>

            <Button type="button" fullWidth variant="contained" onClick={()=>signInUsingEmailPassword()}>Sign in</Button>

            {successMessage !=='' ? <Alert severity="success">{successMessage}</Alert>:''}
            {errorMessage !=='' ? <Alert severity="error">{errorMessage}</Alert>:''}

            <Link component="button" type="button" onClick={()=>setModalForgotPasswordOpen(true)} 
              sx={{ alignSelf: 'center', fontSize:'1.0rem' }}>
              Forgot your password?
            </Link>

            <Dialog open={modalForgotPasswordOpen} onClose={modalClose}>
              <DialogTitle>Reset password</DialogTitle>
              <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <DialogContentText>
                  Enter your account&apos;s email address, and we&apos;ll send you a link to reset your password.
                </DialogContentText>
                <TextField autoFocus fullWidth variant="outlined" color='primary' type="email" 
                  id="emailToRestorePassword" placeholder="Email address"/>
              </DialogContent>
              <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button type="button" variant="contained" onClick={modalClose}>Cancel</Button>
                <Button type="button" variant="contained" onClick={modalContinue}>Continue</Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'center',  gap: 2 }}>
            <GoogleLogin 
              theme='outline'
              text='continue_with'
              shape='rectangular'
              logo_alignment='left'
              onSuccess={signInUsingGoogleOnSuccess}
              onError={signInUsingGoogleOnError}
            />
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account? &nbsp;
              <Link onClick={() => navigate(`${PAGE_REGISTRATION_ROUTE}`)} sx={{ alignSelf: 'center', fontSize: '1.1rem', cursor: 'pointer'}}>
                Sign&nbsp;up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
  )
};
export default PageLogin;