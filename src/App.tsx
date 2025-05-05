import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './store/components/navbar/Navbar';
import AppRouter from './store/routes/AppRouter';
import { useDispatch } from 'react-redux';
import { userSetup } from './store/reducers/siteSlice';
import Loader from './store/components/loader/loader';
import { authAPI } from './store/api/auth';

const App = () => {
  const dispatch = useDispatch();
  const {data:user, isFetching:isUserFetching, isLoading:isUserLoading} = authAPI.useRefreshQuery('')
  useEffect(()=>{
    if(user){
      dispatch(userSetup({
          userEmail: user.user.email,
          token: user.token
      }))
    }
  },[user])

  if(isUserLoading || isUserFetching){
    return (
      <div className='waitServerWakeUp'>
        Please, wait for the server to wake up&nbsp;
        <Loader/>
      </div>
    )
  }

  return (
    <BrowserRouter>
        <Navbar/>
        <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
