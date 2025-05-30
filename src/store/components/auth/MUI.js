import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

export const Card = styled(MuiCard)(({ theme }) => ({
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',
      width: 'calc(100% - 50px)',
      padding: '25px 25px',
      gap: theme.spacing(2),
      margin: 'auto',
      borderRadius: '10px',
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
export const SignInContainer = styled(Stack)(({ theme }) => ({
      height: 'calc(100dvh - 9rem)',
      minHeight: '100%',
      padding: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
      },
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