import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    PAGE_MAIN_ROUTE, 
    PAGE_TEST_ROUTE, 
    /*PAGE_USER_ROUTE,*/
    PAGE_LOGIN_ROUTE, 
    PAGE_LOGOUT_ROUTE, 
    PAGE_REGISTRATION_ROUTE, 
} from '../../routes/routes';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import {Menu as MenuIcon, CloseRounded, Person, HelpCenterTwoTone, HelpCenterSharp} from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import {modalSiteInfoSetup} from '../../reducers/siteSlice';
import ModalSiteInfo from './modalSiteInfo';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userAuth,userEmail} = useSelector((state: RootState) => state.siteReducer);
       
  const StyledToolbar = styled(Box)(() => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
      borderRadius: `8px`,
      backdropFilter: 'blur(24px)',
      border: '1px solid #d5d5d5',
      backgroundColor: 'transparent',
      boxShadow: '0 0 5px #d5d5d5;',
      padding: '10px 12px',
      marginBottom: '10px',
  }));

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {setOpen(newOpen);};

  const logoutButton = () => {
    navigate(PAGE_LOGOUT_ROUTE);
  }

  const {modalSiteInfoOpen} = useSelector((state: RootState) => state.siteReducer);

  return (
      <StyledToolbar>
        <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Button sx={{m:'0 5px'}} variant="outlined" color="info" size="small" onClick={() => navigate(`${PAGE_MAIN_ROUTE}`)}>
              Main
            </Button>
          {userAuth?<Button sx={{m:'0 5px'}} variant="outlined" color="info" size="small" onClick={() => navigate(`${PAGE_TEST_ROUTE}`)}>
              Tests
            </Button>:''}
          {/*userAuth?<Button sx={{m:'0 5px'}} variant="outlined" color="info" size="small" onClick={() => navigate(`${PAGE_USER_ROUTE}`)}>
              Users
          </Button>:''*/}
          </Box>
        </Box>

        <Box sx={{display: { xs: 'none', sm: 'flex' }, gap: 1, alignItems: 'center'}}>
          {!userAuth?<Button color="primary" variant="contained" size="small" onClick={() => navigate(`${PAGE_REGISTRATION_ROUTE}`)}>
            Sign up
          </Button>:''}
          {!userAuth?<Button color="primary" variant="contained" size="small" onClick={() => navigate(`${PAGE_LOGIN_ROUTE}`)}>
            Sign in
          </Button>:''}

          <Tooltip title='Information about this program'>
            <IconButton onClick={()=>dispatch(modalSiteInfoSetup({open:true}))} sx={{padding:'5px'}}>
              <HelpCenterSharp sx={{color: '#0035ff',width:'1.2em',height:'1.2em'}} />
            </IconButton>
          </Tooltip>

          {userAuth? <PopupState variant="popover">
              {(popupState) => (
                <React.Fragment>
                  <Button color="primary" variant="outlined" size="small" {...bindTrigger(popupState)}>
                    <Person/>&nbsp;{userEmail}
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={() => logoutButton()}>Sign out</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
          </PopupState>:''}
        </Box>

        <Box sx={{display: { xs: 'flex', sm: 'none' }, width:'100%', justifyContent:'space-between', gap: 1 }}>
          <IconButton aria-label="Menu button" onClick={toggleDrawer(true)} sx={{padding:'5px'}}>
            <MenuIcon />
          </IconButton>
          {userAuth? <PopupState variant="popover">
              {(popupState) => (
                <React.Fragment>
                  <Button color="primary" variant="outlined" size="small" {...bindTrigger(popupState)}>
                    <Person/>&nbsp;{userEmail}
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={() => logoutButton()}>Sign out</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
          </PopupState>:''}

          <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
            <Box sx={{p:2,backgroundColor:'background.default'}}>
              <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseRounded />
                </IconButton>
              </Box>
              <MenuItem onClick={() => {navigate(`${PAGE_MAIN_ROUTE}`);setOpen(false)}}>Main</MenuItem>
              {userAuth?<MenuItem onClick={() => {navigate(`${PAGE_TEST_ROUTE}`);setOpen(false)}}>Tests</MenuItem>:''}
              {/*userAuth?<MenuItem onClick={() => {navigate(`${PAGE_USER_ROUTE}`);setOpen(false)}}>Users</MenuItem>:''*/}
              <Divider sx={{my:3}} />
              {!userAuth?<MenuItem>
                <Button color="primary" variant="contained" fullWidth onClick={() => {navigate(`${PAGE_REGISTRATION_ROUTE}`);setOpen(false)}}>
                  Sign up
                </Button>
              </MenuItem>:''}
              {!userAuth?<MenuItem>
                <Button color="primary" variant="contained" fullWidth onClick={() => {navigate(`${PAGE_LOGIN_ROUTE}`);setOpen(false)}}>
                  Sign in
                  </Button>
              </MenuItem>:''}
              {userAuth?<MenuItem>
                <Button color="primary" variant="contained" fullWidth onClick={() => { logoutButton();setOpen(false)}}>
                  Sign out
                </Button>
              </MenuItem>:''}
            </Box>
          </Drawer>
        </Box>

        <ModalSiteInfo modalSiteInfoOpen={modalSiteInfoOpen} />
      </StyledToolbar>
  )
}

export default Navbar;