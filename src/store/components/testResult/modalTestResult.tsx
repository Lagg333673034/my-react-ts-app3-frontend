import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { testResultSlice } from '../../reducers/testResultSlice';
import { ITestResult } from '../../type/testResult';
import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { resultTestAPI } from '../../api/resultTest';

interface IModalTestResult {
  modalTestResultOpen: boolean;
}
export default function ModalTestResult({ modalTestResultOpen }: IModalTestResult) {
  const dispatch = useDispatch();
  const {modalTestResultSetup} = testResultSlice.actions;
  const {modalTestResultObject} = useSelector((state: RootState) => state.testResultReducer);

  const {currentData: testRows} = resultTestAPI.useFetchResultTestAnswersQuery({
    idResultTest:modalTestResultObject.id
  }) as any;
  const {currentData: testScore} = resultTestAPI.useFetchResultTestScoreQuery({
    idResultTest:modalTestResultObject.id
  }) as any;

  const diff_minutes = (dt2_s:string, dt1_s:string) => {
    let dt2 = new Date(dt2_s);
    let dt1 = new Date(dt1_s);
    let diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;

    if(Math.abs(Math.round(diff)) < 1){
      return "less then 1";
    }else{
      return Math.abs(Math.round(diff)); 
    }
  }

  let indexQuestion = 1;
  let indexAanswer = 1;
  let idQuestion = '';
  let idAnswer = '';

  const modalTestResultClose = () =>{
    dispatch(modalTestResultSetup({open:false,object:{} as ITestResult}))
  }
  return (
    <Dialog open={modalTestResultOpen} onClose={modalTestResultClose} className='modalTestResult'>
      <DialogTitle className='modalTestResult'>Result</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <div>
          Test name:&nbsp;
          <div style={{display:'inline-block',color:'blue'}}>
             {modalTestResultObject.testName} 
          </div>
        </div>
        <div>
        Who took the test:&nbsp;
          <div style={{display:'inline-block',color:'green'}}>
            {modalTestResultObject.emailRegistred !=='' ? modalTestResultObject.emailRegistred : modalTestResultObject.emailNotRegistred}
          </div>
        </div>
        <div>
        Finish time:&nbsp;
          <div style={{display:'inline-block',color:'#bb009d'}}>
             {modalTestResultObject.timeFinish}&nbsp;
            ({diff_minutes(modalTestResultObject.timeFinish0,modalTestResultObject.timeStart0)} min.)
          </div>
        </div>
        <div>
        Score:&nbsp;
          <div style={{display:'inline-block',color:'#cb0000', fontWeight:'bold'}}>
            {testScore && testScore[0] && testScore[0].questionTrueCount} / {testScore && testScore[0] && testScore[0].questionCount}
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table size="small" className='testResultAnswers'>
              <TableBody>
              {testRows && testRows.map((row:any) => 
                  <>
                  {row.idQuestion !== idQuestion ? 
                  <TableRow key={row.idQuestion} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell className='answerRowHeader'>
                          {indexQuestion}
                      </TableCell>
                      <TableCell className='answerRowHeader' sx={{width:'100%',textAlign:'left',}}>
                          {row.questionName}
                      </TableCell>
                      <TableCell className='answerRowHeader' sx={{width:'100px'}}>
                          User<br/>answer
                      </TableCell>
                      <TableCell className='answerRowHeader' sx={{width:'100px'}}>
                          Correct<br/>answer
                      </TableCell>
                      <TableCell sx={{display:'none'}}>
                          {indexQuestion++}
                          {idQuestion=row.idQuestion}
                          {indexAanswer=1}
                          {idAnswer=''}
                      </TableCell>
                  </TableRow> :''}
                  
                  {row.idAnswer !== idAnswer ? 
                  <TableRow key={row.idAnswer} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell className={'answerRow '+ 
                      ((row.userAnswer===1 && row.correctAnswer===1) ? 'correctAnswerRow':'')+
                      ((row.userAnswer===1 && row.correctAnswer===0) ? 'inCorrectAnswerRow':'')+
                      ((row.userAnswer===0 && row.correctAnswer===1) ? 'inCorrectAnswerRow':'')
                      }>
                      </TableCell>
                      <TableCell sx={{width:'100%',textAlign:'left'}} className={'answerRow '+ 
                      ((row.userAnswer===1 && row.correctAnswer===1) ? 'correctAnswerRow':'')+
                      ((row.userAnswer===1 && row.correctAnswer===0) ? 'inCorrectAnswerRow':'')+
                      ((row.userAnswer===0 && row.correctAnswer===1) ? 'inCorrectAnswerRow':'')
                      }>
                        {row.answerName} 
                      </TableCell>
                      <TableCell sx={{width:'30px'}} className={'answerRow '+ 
                      ((row.userAnswer===1 && row.correctAnswer===1) ? 'correctAnswerRow':'')+
                      ((row.userAnswer===1 && row.correctAnswer===0) ? 'inCorrectAnswerRow':'')+
                      ((row.userAnswer===0 && row.correctAnswer===1) ? 'inCorrectAnswerRow':'')
                      }>
                        <Checkbox disabled sx={{color:'#1976d2!important'}} 
                        defaultChecked={Number(row.userAnswer)==1 ? true : false} /> 
                      </TableCell>
                      <TableCell sx={{width:'30px'}} className={'answerRow '+ 
                      ((row.userAnswer===1 && row.correctAnswer===1) ? 'correctAnswerRow':'')+
                      ((row.userAnswer===1 && row.correctAnswer===0) ? 'inCorrectAnswerRow':'')+
                      ((row.userAnswer===0 && row.correctAnswer===1) ? 'inCorrectAnswerRow':'')
                      }>
                        <Checkbox disabled sx={{color:'#1976d2!important'}} 
                        defaultChecked={Number(row.correctAnswer)===1 ? true : false} /> 
                      </TableCell>
                      <TableCell sx={{display:'none'}}>
                        {indexAanswer++}
                        {idAnswer=row.idAnswer}
                      </TableCell>
                  </TableRow> :''}
                  </>
              )}
              </TableBody>
          </Table>
        </TableContainer>


        
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button variant="contained" type="button" onClick={modalTestResultClose}>
          Cancel
          </Button>
      </DialogActions>
    </Dialog>
  );
}
