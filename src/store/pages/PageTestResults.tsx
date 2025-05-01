import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { testAPI } from '../api/test';
import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs, Typography } from '@mui/material';
import TestResultList from '../components/testResult/TestResultList';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import ModalTestResult from '../components/testResult/modalTestResult';

const PageTestResults = () => {
    const {idTest} = useParams();
    const {data: tests, refetch} = testAPI.useFetchTestQuery(Number(idTest));
    useEffect(()=>{
        refetch();
    },[])

    const breadcrumbs = [
        <Typography key="2" sx={{ color: 'text.primary' }}>Test rersults</Typography>,
    ];

    const {modalTestResultOpen} = useSelector((state: RootState) => state.testResultReducer);
 
    return(
        <div style={{width:'100%'}}>
            <Breadcrumbs sx={{marginBottom:'10px'}} separator={<NavigateNext fontSize="small" />}>
                {breadcrumbs}
            </Breadcrumbs>

             <div style={{display:'grid', fontSize: '1.2em', fontWeight: 'bold', margin:'0 0 10px 0'}}>
                Results for test: {tests && tests[0] && tests[0].name}
            </div>
            
            <TestResultList />

            <ModalTestResult modalTestResultOpen={modalTestResultOpen} />
        </div>
    )
};
export default PageTestResults;