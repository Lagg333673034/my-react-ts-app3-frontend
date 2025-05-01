import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authAPI } from '../api/auth';
import { IUser } from '../type/user';
import { siteSlice } from '../reducers/siteSlice';
import { useNavigate } from 'react-router-dom';
import { PAGE_MAIN_ROUTE, PAGE_REGISTRATION_ROUTE } from '../routes/routes';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Alert } from '@mui/material';
//import ForgotPassword from '../components/ForgotPassword';

const PageLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userSetup} = siteSlice.actions;
    const [login, {error: authError, isLoading: isAuthLoading}] = authAPI.useLoginMutation();

    const [successMessage,setSuccessMessage] = useState<string>('');
    const [errorMessage,setErrorMessage] = useState<string>('');

    const signInButtonClick = async () => {
      const email = document.getElementById('email') as HTMLInputElement;
      const password = document.getElementById('password') as HTMLInputElement;
      setSuccessMessage('');
      setErrorMessage('');
      const result = await login({email: email.value,password: password.value} as IUser) as any;

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

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: 'calc(100% - 64px)',
    padding: '32px',
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '350px',
    },
    boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
      boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));
const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc(100dvh - 150px)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),},
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: -1,
      inset: 0,
      backgroundImage:
        'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
      backgroundRepeat: 'no-repeat',
      ...theme.applyStyles('dark', {
        backgroundImage:
          'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
      }),
    },
}));

    return(
        <SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography sx={{ width: '100%', fontSize: 'clamp(1.5rem, 8vw, 2.0rem)' }}>
              Sign in
            </Typography>
            <Box component="section" sx={{display: 'flex',flexDirection: 'column',width: '100%',gap: 2,}}>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                    placeholder="your@email.com" autoComplete="email"
                    id="email" type="email" name="email"
                    required fullWidth variant="outlined" color={'primary'}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField 
                    placeholder="••••••" autoComplete="password" 
                    id="password" type="password" name="password" 
                    required fullWidth variant="outlined" color={'primary'}
                />
              </FormControl>

              <Button type="submit" fullWidth variant="contained" onClick={()=>signInButtonClick()}>
                Sign in
              </Button>

              {successMessage !='' ? <Alert severity="success">{successMessage}</Alert>:''}
              {errorMessage !='' ? <Alert severity="error">{errorMessage}</Alert>:''}

              {/*<ForgotPassword open={open} handleClose={handleClose} />
              <Link component="button" type="button" onClick={handleClickOpen} sx={{ alignSelf: 'center' }}>
                Forgot your password?
              </Link>*/}
            </Box>

            <Divider>or</Divider>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

              {/*<Button fullWidth variant="outlined" onClick={() => alert('Sign in with Google')} startIcon={<GoogleIcon />}>
                Sign in with Google
              </Button>*/}

              <Typography sx={{ textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                <Link onClick={() => navigate(`${PAGE_REGISTRATION_ROUTE}`)} sx={{ alignSelf: 'center', fontSize: '1.1rem', cursor: 'pointer'}}>
                  Sign up
                </Link>
              </Typography>
            </Box>

          </Card>
        </SignInContainer>
    )
};
export default PageLogin;