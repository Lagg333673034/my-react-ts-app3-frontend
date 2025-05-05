import './PageRegistration.css';
import React, { useState } from 'react';
import { authAPI } from '../../api/auth';
import { IUser } from '../../type/user';
import { useNavigate } from 'react-router-dom';
import { PAGE_LOGIN_ROUTE } from '../../routes/routes';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import { Card, SignInContainer } from './MUI';

const PageRegistration = () => {
    const navigate = useNavigate();
    const [registration] = authAPI.useRegistrationUsingEmailPasswordMutation();

    const [successMessage,setSuccessMessage] = useState<string>('');
    const [errorMessage,setErrorMessage] = useState<string>('');

    const registrationButtonClick = async () => {
      const email = document.getElementById('email') as HTMLInputElement;
      const password = document.getElementById('password') as HTMLInputElement;
      setSuccessMessage('');
      setErrorMessage('');

      const result = await registration({email: email.value,password: password.value} as IUser) as any;

      if(result.data){
        setSuccessMessage(result.data.message);
      }
      if(result.error){
        setErrorMessage(result.error.data.message);
      }
    };

    return(
        <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography className='titleName'>Sign up</Typography>
          <Box component="section" sx={{display: 'flex',flexDirection: 'column',width: '100%',gap: 2,}}>
            <FormControl  className='inputs'>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                  id="email" type="email" name="email" placeholder="your@email.com" autoComplete="email"
                  autoFocus required fullWidth variant="outlined" color={'primary'}
              />
            </FormControl>
            <FormControl  className='inputs'>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField 
                  id="password" type="password" name="password" placeholder="••••••" autoComplete="current-password" 
                  autoFocus required fullWidth variant="outlined" color={'primary'}
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained" onClick={()=>registrationButtonClick()}>
              Sign up
            </Button>

            {successMessage !=='' ? <Alert severity="success">{successMessage}</Alert>:''}
            {errorMessage !=='' ? <Alert severity="error">{errorMessage}</Alert>:''}
          </Box>

          <Divider>or</Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
                Already have an account? &nbsp;
              <Link onClick={() => navigate(`${PAGE_LOGIN_ROUTE}`)} sx={{ alignSelf: 'center', fontSize: '1.1rem', cursor: 'pointer' }}>
                Sign&nbsp;in
              </Link>
            </Typography>
          </Box>

        </Card>
      </SignInContainer>
    )
};
export default PageRegistration;