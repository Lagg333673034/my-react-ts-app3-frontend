import React, { FC, useEffect } from 'react';
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
import { Delete, MenuBook } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { modalTestResultSetup, modalTestResultDeleteSetup} from '../../reducers/testResultSlice';
import ModalTestResultDelete from './modalTestResultDelete';
import { RootState } from '../../reducers';
import { useSelector } from 'react-redux';
import { ITestResult } from '../../type/testResult';
import moment from 'moment';

const TestResultList: FC = () => {
    const dispatch = useDispatch();
    const {idTest} = useParams();
    const {data: testResults, isLoading, isError, refetch} = resultTestAPI.useFetchResultTestQuery({idTest:Number(idTest)});

    useEffect(()=>{
        refetch();
    },[])

    const [deleteResultTest] = resultTestAPI.useDeleteResultTestMutation();
    const {modalTestResultDeleteOpen,modalTestResultDeleteObject} = useSelector((state: RootState) => state.testResultReducer);
    const modalTestResultDeleteExecute = () => {
        deleteResultTest({idTest:Number(idTest),id:Number(modalTestResultDeleteObject.id)});
        dispatch(modalTestResultDeleteSetup({open:false,object:{} as ITestResult}))
    };

    return(
        <div style={{width:'100%', textAlign:'center'}}>

            {isLoading ? <div><Loader/></div> : ''}
            {isError ? <div>Error: data fetching error</div> : ''}

            <TableContainer component={Paper}>
            <Table size="small" className='testResults'>
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>Res</TableCell>
                        <TableCell>Email (finish time)</TableCell>
                        <TableCell>Del</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {testResults && testResults.map((testResult,index) => (
                    <TableRow hover key={testResult.id} sx={{ '&:last-child td, &:last-child th':{border:0}}}>
                        <TableCell>
                            {index+=1}
                        </TableCell>
                        <TableCell>
                            <Tooltip title='Results'>
                                <IconButton size="small" color='primary' onClick={()=>
                                    dispatch(modalTestResultSetup({open:true,object:testResult}))}>
                                    <MenuBook/>
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                        <TableCell sx={{wordBreak: 'break-all'}}>
                            <div style={{color: 'rgb(0, 0, 184)'}}>
                                {testResult.emailRegistred !='' ? testResult.emailRegistred : testResult.emailNotRegistred}
                            </div>
                            ({moment(testResult.timeFinishUTC).format("MM.DD.YYYY - HH:mm:ss")})
                        </TableCell>
                        <TableCell>
                            <Tooltip title='Delete'>
                                <IconButton size="small" color='error' onClick={()=>
                                    dispatch(modalTestResultDeleteSetup({open:true,object:testResult}))}>
                                    <Delete/>
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>


            <ModalTestResultDelete 
            modalTestResultDeleteOpen={modalTestResultDeleteOpen} 
            modalTestResultDeleteExecute={modalTestResultDeleteExecute} 
            />
        </div>
    )
}

export default TestResultList;