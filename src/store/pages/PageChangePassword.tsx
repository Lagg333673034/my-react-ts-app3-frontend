import React, { useState } from 'react';
import { authAPI } from '../api/auth';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Alert } from '@mui/material';

const PageChangePassword = () => {
  const {uuid} = useParams();
  const [restorePasswordUpdatePassword] = authAPI.useRestorePasswordChangePasswordMutation();

  const [successMessage,setSuccessMessage] = useState<string>('');
  const [errorMessage,setErrorMessage] = useState<string>('');

  const updatePassword = async () => {
    const newPassword = document.getElementById('newPassword') as HTMLInputElement;
    setSuccessMessage('');
    setErrorMessage('');
    //console.log(newPassword.value)
    const result = await restorePasswordUpdatePassword({
      uuid:String(uuid),
      newPassword:String(newPassword.value)
    }) as any;

    if(result.data){
      setSuccessMessage(result.data.message);
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
            <Typography sx={{ width: '100%', fontSize: 'clamp(1.5rem, 8vw, 2.0rem)' }}>Recover password</Typography>
            <Box component="section" sx={{display: 'flex',flexDirection: 'column',width: '100%',gap: 2,}}>

              <FormControl>
                <FormLabel htmlFor="password">New password</FormLabel>
                <TextField fullWidth variant="outlined" color='primary' placeholder="••••••"
                  id="newPassword" type="password" />
              </FormControl>
              <Button type="button" fullWidth variant="contained" onClick={()=>updatePassword()}>Change password</Button>

              {successMessage !=='' ? <Alert severity="success">{successMessage}</Alert>:''}
              {errorMessage !=='' ? <Alert severity="error">{errorMessage}</Alert>:''}
            </Box>
          </Card>
        </SignInContainer>
    )
};
export default PageChangePassword;