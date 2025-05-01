import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { testAPI } from '../api/test';
import { useParams } from 'react-router-dom';
import { Alert, Button, Checkbox, FormControl, FormLabel, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import {v4 as uuidv4} from 'uuid'
import { getCurrentDataTime } from '../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { resultTestAPI } from '../api/resultTest';

const PageReadyForPassTest = () => {
    const {idTest,uuid} = useParams();
    const {userAuth,userEmail} = useSelector((state: RootState) => state.siteReducer);

    const [successMessage,setSuccessMessage] = useState<string>('');
    const [errorMessage,setErrorMessage] = useState<string>('');
    let timeStart = getCurrentDataTime();
    let timeFinish = '';
    let indexQuestion = 1;
    let indexAanswer = 1;
    let questionName = '';
    let answerName = '';

    const {currentData: testRows, error, isLoading} = testAPI.useFetchReadyForPassTestQuery({idTest:Number(idTest), uuid:String(uuid)});
    useEffect(()=>{
        if (error && "data" in error) {
            const errorForFetch = error as any;
            setErrorMessage(errorForFetch.data.message);
        }
    },[error])
      
    const [saveResultTest] = resultTestAPI.useSaveResultTestMutation();
    const handlerSaveResultTest = async() =>{
        let answerResults = document.querySelectorAll('input[name=checkboxesValue]:checked') as any;
        let answers = new Array;
        for(let i=0; i<answerResults.length; i++){
            answers.push(answerResults[i].value)
        }

        timeFinish = getCurrentDataTime();

        let resultSaveTest = await saveResultTest({
            idTest:Number(idTest),
            timeStart:timeStart,
            timeFinish:timeFinish,
            answers:answers
        }) as any;
        

        setSuccessMessage('');
        setErrorMessage('');
        if(resultSaveTest.data){
            setSuccessMessage(resultSaveTest.data.message);
        }
        if(resultSaveTest.error){
            setErrorMessage(resultSaveTest.error.data.message);
        }
    }

    //console.log(testRows)
    /*proverit` 3 sposoba sohraneniya:
    svoi test so svoego akkaynta
    test s chyjogo akkaynta
    test neavtorizovanim polzovatelem*/

    return(
        <div style={{width:'100%'}}>
            {!isLoading && testRows?.length && testRows?.length>0 ? 
            <div>
                <div style={{display:'grid', fontSize: '1.2em', fontWeight: 'bold', margin:'0 0 10px 0'}}>
                    Test: {testRows && testRows[0] && testRows[0].testName}
                </div>
            
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" className='readyToPassTest'>
                    <TableBody>
                    {testRows && testRows.map((row:any) => 
                        <>

                        {row.questionName != questionName ? 
                        <TableRow key={row.idQuestion} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell sx={{
                                borderTop:'1px solid rgba(224, 224, 224, 1)',
                                backgroundColor:'rgb(238, 238, 238)',
                                fontWeight: 'bold',
                                }}>
                                {indexQuestion}
                            </TableCell>
                            <TableCell colSpan={2} sx={{
                                width:'100%',
                                borderTop:'1px solid rgba(224, 224, 224, 1)',
                                backgroundColor:'rgb(238, 238, 238)',
                                fontWeight: 'bold',
                                }}>
                                {row.questionName}
                            </TableCell>

                            <TableCell sx={{display:'none'}}>
                                {indexQuestion++}
                                {questionName=row.questionName}
                                {indexAanswer=1}
                            </TableCell>
                        </TableRow> :''}
                        
                        {row.answerName != answerName ? 
                        <TableRow key={row.idAnswer} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>
                                {indexAanswer}
                            </TableCell>
                            <TableCell sx={{width:'30px', padding:'0'}}>
                                <Checkbox name="checkboxesValue" value={row.idAnswer} /> 
                            </TableCell>
                            <TableCell sx={{width:'100%'}}>
                                {row.answerName} 
                            </TableCell>

                            <TableCell sx={{display:'none'}}>
                                {indexAanswer++}
                                {answerName=row.answerName}
                            </TableCell>
                        </TableRow> :''}

                        </>
                    )}
                    </TableBody>
                </Table>
                </TableContainer>

                <Button variant="contained" style={{margin:'10px 0 0 0'}} onClick={()=>handlerSaveResultTest()} >
                    Finish test!
                </Button>

            </div>
            : 
            <div style={{display:'grid', justifyContent:'center', fontSize:'1.3em', margin:'30px 0 30px 0'}}>
                Sorry, the test is not ready yet.
            </div>}
            {successMessage !='' ? <Alert severity="success">{successMessage}</Alert>:''}
            {errorMessage !='' ? <Alert severity="error">{errorMessage}</Alert>:''}
        </div>
    )
};
export default PageReadyForPassTest;