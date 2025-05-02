import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { testAPI } from '../api/test';
import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs, Typography } from '@mui/material';
import TestResultList from '../components/testResult/TestResultList';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import ModalTestResult from '../components/testResult/modalTestResult';
import Link from '@mui/material/Link';
import { PAGE_TEST_ROUTE } from '../routes/routes';

const PageTestResults = () => {
    const navigate = useNavigate();
    const {idTest} = useParams();
    const {data: tests, refetch} = testAPI.useFetchTestQuery(Number(idTest));
    useEffect(()=>{
        refetch();
    },[])

    const breadcrumbs = [
        <Link style={{cursor:'pointer'}} underline="hover" key="1" color="inherit" onClick={()=>navigate(PAGE_TEST_ROUTE)}>
            Tests
        </Link>,
        <Typography key="2" sx={{ color: 'text.primary' }}>Test rersults</Typography>,
    ];

    const {modalTestResultOpen} = useSelector((state: RootState) => state.testResultReducer);
 
    return(
        <div style={{width:'100%'}}>
            <Breadcrumbs sx={{marginBottom:'10px'}} separator={<NavigateNext fontSize="small" />}>
                {breadcrumbs}
            </Breadcrumbs>

            <div style={{display:'block', fontSize: '1.2em', margin:'0 0 10px 0'}}>
                <span style={{fontWeight: 'bold'}}>For test:</span> &nbsp;{tests && tests[0] && tests[0].name}
            </div>
            
            <TestResultList />

            <ModalTestResult modalTestResultOpen={modalTestResultOpen} />
        </div>
    )
};
export default PageTestResults;