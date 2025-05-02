import React, {FC} from 'react';
import { IQuestion } from '../../type/question';
import { useNavigate, useParams } from 'react-router-dom';
import { PAGE_ANSWER_ROUTE, PAGE_QUESTION_ROUTE, PAGE_TEST_ROUTE } from '../../routes/routes';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import { Delete, Edit, FormatListBulleted } from '@mui/icons-material';
import { questionSlice } from '../../reducers/questionSlice';


interface QuestionItemProps{
    question: IQuestion;
}
const QuestionItem: FC<QuestionItemProps> = ({question}) => {
  const {idTest} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {modalQuestionUpdateSetup, modalQuestionDeleteSetup} = questionSlice.actions;

  const handlerSelect = async (e: React.MouseEvent) => {
    navigate(PAGE_TEST_ROUTE+`/${idTest}`+PAGE_QUESTION_ROUTE+`/${question.id}`+PAGE_ANSWER_ROUTE);
  }

  return (
    <div key={question.id} style={{display:'flex', flexDirection:'row', flexFlow:'row', flexWrap:'wrap', 
        justifyContent:'space-between', alignItems:'center'}}>
        <div style={{fontSize:'16px',padding:'10px 10px'}}>
          {question.name} (A:&nbsp;{question.answerCount}, True:&nbsp;{question.answerTrueCount})
        </div>
        <div>
          <IconButton size="medium" color='success' onClick={handlerSelect} title='Go to the answers list'>
            <FormatListBulleted/>
          </IconButton>
          <IconButton size="medium" color='warning' onClick={()=>dispatch(modalQuestionUpdateSetup({open:true,object:question}))} title='Edit question'>
            <Edit/>
          </IconButton>
          <IconButton size="medium" color='error' onClick={()=>dispatch(modalQuestionDeleteSetup({open:true,object:question}))} title='Delete question'>
            <Delete/>
          </IconButton>
        </div>
    </div>
  );
}

export default QuestionItem;
