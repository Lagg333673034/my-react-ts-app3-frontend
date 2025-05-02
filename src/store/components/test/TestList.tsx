import React, { FC, useEffect } from 'react';
import {testAPI} from '../../api/test';
import TestItem from './TestItem';
import { ITest } from '../../type/test';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { testSlice } from '../../reducers/testSlice';
import { useDispatch } from 'react-redux';
import Loader from '../loader/loader';

const TestList: FC = () => {
    const dispatch = useDispatch();
    const {data: tests, isLoading, isError, refetch} = testAPI.useFetchTestQuery(0);
    const {modalTestAddSetup} = testSlice.actions;

    useEffect(()=>{
        refetch();
    },[])

    return(
        <div style={{width:'100%', textAlign:'center'}}>
            <Button variant="contained" color="success" sx={{mb:'10px', float:'left'}}
                onClick={()=>dispatch(modalTestAddSetup({open:true,object:{} as ITest}))}>
                Add new Test
            </Button>

            {isLoading ? <div><Loader/></div> : ''}
            {isError ? <div>Error: data fetching error</div> : ''}

            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small">
                <TableBody>
                {tests && tests.map((test,index) => (
                    <TableRow hover key={test.id} sx={{ '&:last-child td, &:last-child th':{border:0}}}>
                        <TableCell>
                            {index+=1}
                        </TableCell>
                        <TableCell>
                            <TestItem key={test.id} test={test} />
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}

export default TestList;