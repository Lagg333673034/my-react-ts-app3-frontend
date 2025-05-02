import React, {FC} from 'react';
import { IAnswer } from '../../type/answer';
import { useDispatch } from 'react-redux';
import { answerSlice } from '../../reducers/answerSlice';
import { IconButton } from '@mui/material';
import { CheckCircleOutline, Delete, Edit, FormatListBulleted, RadioButtonUnchecked, RadioButtonUncheckedSharp } from '@mui/icons-material';
import { answerAPI } from '../../api/answer';
import { useParams } from 'react-router-dom';

interface AnswerItemProps{
  answer: IAnswer;
}
const AnswerItem: FC<AnswerItemProps> = ({answer}) => {
  const dispatch = useDispatch();
  const {idTest,idQuestion} = useParams();
  const {modalAnswerUpdateSetup, modalAnswerDeleteSetup} = answerSlice.actions;
  const [setCorrectAnswer] = answerAPI.useSetCorrectAnswerMutation();

  const handlerSetCorrect = (answerCorrect: number) => {
    let newAnswerCorrect = 0;
    if(answerCorrect == 0){
      newAnswerCorrect = 1;
    }

    setCorrectAnswer({
      idQuestion:Number(idQuestion), 
      answer: {id: answer.id, correct: newAnswerCorrect} as IAnswer
    })
  }

  return (
    <div key={answer.id} style={{display:'flex', flexDirection:'row', flexFlow:'row', flexWrap:'wrap', 
      justifyContent:'space-between', alignItems:'center'}}>
        <div style={{fontSize:'16px',padding:'10px 10px'}}>
          {answer.name}
        </div>
        <div>
          <IconButton size="medium"  onClick={()=>handlerSetCorrect(answer.correct)} title={answer.correct===0 ? 'False answer' : 'True answer'}>
            {answer.correct==0 ? <RadioButtonUnchecked color='action'/> : <CheckCircleOutline color='success'/>}
          </IconButton>
          <IconButton size="medium" color='warning' onClick={()=>dispatch(modalAnswerUpdateSetup({open:true,object:answer}))} title='Edit answer'>
            <Edit/>
          </IconButton>
          <IconButton size="medium" color='error' onClick={()=>dispatch(modalAnswerDeleteSetup({open:true,object:answer}))} title='Delete answer'>
            <Delete/>
          </IconButton>
        </div>
    </div>
  );
}

export default AnswerItem;
