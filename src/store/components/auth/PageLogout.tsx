import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authAPI } from '../../api/auth';
import { userLogout } from '../../reducers/siteSlice';
import { useNavigate } from 'react-router-dom';
import { PAGE_LOGIN_ROUTE} from '../../routes/routes';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const PageLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {data: logout, isLoading, isFetching, isError} = authAPI.useLostLogoutQuery('');

  useEffect(()=>{
      dispatch(userLogout());
      navigate(PAGE_LOGIN_ROUTE);
  },[])
      
    return(
      <div></div>
    )
};
export default PageLogout;