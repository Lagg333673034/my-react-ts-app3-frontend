import React, { FC, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import Loader from '../loader/loader';
import { resultTestAPI } from '../../api/resultTest';
import { useParams } from 'react-router-dom';
import { MenuBook } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { testResultSlice } from '../../reducers/testResultSlice';

const TestResultList: FC = () => {
    const dispatch = useDispatch();
    const {idTest} = useParams();
    const {data: testResults, isLoading, isError, refetch} = resultTestAPI.useFetchResultTestQuery({idTest:Number(idTest)});
    const {modalTestResultSetup} = testResultSlice.actions;

    useEffect(()=>{
        refetch();
    },[])

    return(
        <div style={{width:'100%', textAlign:'center'}}>

            {isLoading ? <div><Loader/></div> : ''}
            {isError ? <div>Error: data fetching error</div> : ''}

            <TableContainer component={Paper}>
            <Table size="small" className='testResults'>
                <TableBody>
                {testResults && testResults.map((testResult,index) => (
                    <TableRow hover key={testResult.id} sx={{ '&:last-child td, &:last-child th':{border:0}}}>
                        <TableCell>
                            {index+=1}
                        </TableCell>
                        <TableCell>
                            <IconButton size="small" color='primary' onClick={()=>dispatch(modalTestResultSetup({open:true,object:testResult}))} title='Delete test'>
                                <MenuBook/>
                            </IconButton>
                        </TableCell>
                        <TableCell>
                            {testResult.testName}
                        </TableCell>
                        <TableCell>
                            {testResult.emailRegistred !='' ? testResult.emailRegistred : testResult.emailNotRegistred}
                        </TableCell>
                        <TableCell>
                            {testResult.timeFinish}
                        </TableCell>
                        <TableCell>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}

export default TestResultList;