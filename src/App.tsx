import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import Navbar from './store/components/navbar/Navbar';
import AppRouter from './store/routes/AppRouter';
import { siteSlice } from './store/reducers/siteSlice';
import { useDispatch } from 'react-redux';
import { authAPI } from './store/api/auth';
import Loader from './store/components/loader/loader';


const App = () => {
  const dispatch = useDispatch();
  const {userSetup} = siteSlice.actions;
  const {data: checkAuth, isLoading,isFetching} = authAPI.useCheckAuthQuery('',{pollingInterval: 30*60*1000});
  
  useEffect(()=>{
    if(checkAuth && checkAuth.token && checkAuth.user && checkAuth.user.id && checkAuth.user.email){
      dispatch(userSetup({
          userEmail: checkAuth.user.email,
          token: checkAuth.token
      }))
    }
  },[checkAuth])

  if(isLoading || isFetching){
    return <div><Loader/></div>
  }

  return (
    <BrowserRouter>
        <Navbar/>
        <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
