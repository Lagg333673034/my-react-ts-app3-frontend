import React, { FC, useEffect } from 'react';
import { questionAPI } from '../../api/question';
import QuestionItem from './QuestionItem';
import { IQuestion } from '../../type/question';
import Loader from '../loader/loader';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { modalQuestionAddSetup } from '../../reducers/questionSlice';


interface QuestionListProps{
    idTest:number;
}
const QuestionList: FC<QuestionListProps> = ({idTest}) => {
    const dispatch = useDispatch();
    const {data: questions, isLoading, isError, refetch} = questionAPI.useFetchQuestionQuery({idTest:idTest, idQuestion:0});

    useEffect(()=>{
        refetch();
    },[])

    return(
        <div style={{width:'100%', textAlign:'center'}}>
            <Button variant="contained" color="success" sx={{mb:'10px', float:'left'}}
                onClick={()=>dispatch(modalQuestionAddSetup({open:true,object:{} as IQuestion}))}>
                Add new Question
            </Button>

            {isLoading ? <div><Loader/></div> : ''}
            {isError ? <div>Error: data fetching error</div> : ''}

            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small">
                <TableBody>
                {questions && questions.map((question, index) => (
                    <TableRow hover key={question.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                            {index+=1}
                        </TableCell>
                        <TableCell>
                            <QuestionItem key={question.id} question={question} />
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}

export default QuestionList;