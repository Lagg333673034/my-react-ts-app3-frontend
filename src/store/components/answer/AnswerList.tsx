import React, { FC, useEffect, useState } from 'react';
import { answerAPI } from '../../api/answer';
import AnswerItem from './AnswerItem';
import { IAnswer } from '../../type/answer';
import { useDispatch } from 'react-redux';
import { answerSlice } from '../../reducers/answerSlice';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Loader from '../loader/loader';

interface AnswerListProps{
    idQuestion:number;
}
const AnswerList: FC<AnswerListProps> = ({idQuestion}) => {
    const dispatch = useDispatch();
    const {data: answers, isLoading, isError, refetch} = answerAPI.useFetchAnswerQuery({idQuestion:idQuestion, idAnswer:0});
    const {modalAnswerAddSetup} = answerSlice.actions;

    useEffect(()=>{
        refetch();
    },[])

    return(
        <div style={{width:'100%', textAlign:'center'}}>
            <Button variant="contained" color="success" sx={{mb:'10px', float:'left'}}
                onClick={()=>dispatch(modalAnswerAddSetup({open:true,object:{} as IAnswer}))}>
                Add new Answer
            </Button>

            {isLoading ? <div><Loader/></div> : ''}
            {isError ? <div>Error: data fetching error</div> : ''}

            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small">
                <TableBody>
                {answers && answers.map((answer,index) => (
                    <TableRow hover key={answer.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                            {index+=1}
                        </TableCell>
                        <TableCell>
                            <AnswerItem key={answer.id} answer={answer} />
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}

export default AnswerList;