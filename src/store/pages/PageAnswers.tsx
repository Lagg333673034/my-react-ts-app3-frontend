import React, { useEffect } from 'react';
import AnswerList from '../components/answer/AnswerList';
import { useNavigate, useParams } from 'react-router-dom';
import { questionAPI } from '../api/question';
import { testAPI } from '../api/test';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { PAGE_QUESTION_ROUTE, PAGE_TEST_ROUTE } from '../routes/routes';
import ModalAdd from '../components/answer/modalAdd';
import ModalUpdate from '../components/answer/modalUpdate';
import ModalDelete from '../components/answer/modalDelete';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { modalAnswerAddSetup, modalAnswerDeleteSetup, modalAnswerUpdateSetup } from '../reducers/answerSlice';
import { answerAPI } from '../api/answer';
import { IAnswer } from '../type/answer';


const PageAnswer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {idTest,idQuestion} = useParams();
    
    let {data: tests, refetch: refetchTest} = testAPI.useFetchTestQuery(Number(idTest));
    let {data: questions, refetch: refetchQuestion} = questionAPI.useFetchQuestionQuery({idTest:Number(idTest),idQuestion:Number(idQuestion)});

    useEffect(()=>{
        refetchTest();
        refetchQuestion();
    },[])

    const breadcrumbs = [
        <Link style={{cursor:'pointer'}} underline="hover" key="1" color="inherit" 
        onClick={()=>navigate(PAGE_TEST_ROUTE)}>
            Tests
        </Link>,
        <Link style={{cursor:'pointer'}} underline="hover" key="2" color="inherit" 
        onClick={()=>navigate(PAGE_TEST_ROUTE+`/${idTest}`+PAGE_QUESTION_ROUTE)}>
            Questions
        </Link>,
        <Typography key="3" sx={{ color: 'text.primary' }}>Answers</Typography>,
    ];

    const [createAnswer] = answerAPI.useCreateAnswerMutation();
    const [updateAnswer] = answerAPI.useUpdateAnswerMutation();
    const [deleteAnswer] = answerAPI.useDeleteAnswerMutation();
    const {
        modalAnswerAddOpen, modalAnswerAddObject,
        modalAnswerUpdateOpen, modalAnswerUpdateObject,
        modalAnswerDeleteOpen, modalAnswerDeleteObject
    } = useSelector((state: RootState) => state.answerReducer);
    const modalAddExecute = () => {
        const modalAddAnswerName = document.getElementById('modalAddAnswerName') as HTMLInputElement;
        createAnswer({idQuestion:Number(idQuestion), answer: {name:modalAddAnswerName.value} as IAnswer});
        dispatch(modalAnswerAddSetup({open:false,object:{} as IAnswer}))
    };
    const modalUpdateExecute = () => {
        const modalUpdateAnswerName = document.getElementById('modalUpdateAnswerName') as HTMLInputElement;
        updateAnswer({idQuestion:Number(idQuestion), answer: {id: modalAnswerUpdateObject.id, name:modalUpdateAnswerName.value} as IAnswer});
        dispatch(modalAnswerUpdateSetup({open:false,object:{} as IAnswer}))
    };
    const modalDeleteExecute = () => {
        deleteAnswer({idQuestion:Number(idQuestion), idAnswer: modalAnswerDeleteObject.id});
        dispatch(modalAnswerDeleteSetup({open:false,object:{} as IAnswer}))
    };

    return(
        <div style={{width:'100%'}}>
            <Breadcrumbs sx={{marginBottom:'10px'}} separator={<NavigateNextIcon fontSize="small" />}>
                {breadcrumbs}
            </Breadcrumbs>

            <div style={{display:'block', fontSize: '1.2em', margin:'0 0 0 0'}}>
                <span style={{fontWeight: 'bold'}}>Test:</span> &nbsp;{tests && tests[0] && tests[0].name}
            </div>
            <div style={{display:'block', fontSize: '1.2em', margin:'0 0 10px 0'}}>
                <span style={{fontWeight: 'bold'}}>Question:</span> &nbsp;{questions && questions[0] && questions[0].name}
            </div>

            <AnswerList idQuestion={Number(idQuestion)} />

            <ModalAdd modalAddOpen={modalAnswerAddOpen} modalAddExecute={modalAddExecute} />
            <ModalUpdate modalUpdateOpen={modalAnswerUpdateOpen} modalUpdateExecute={modalUpdateExecute} />
            <ModalDelete modalDeleteOpen={modalAnswerDeleteOpen} modalDeleteExecute={modalDeleteExecute} />
        </div>
    )
};
export default PageAnswer;