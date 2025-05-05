import React, { useEffect } from 'react';
import QuestionList from '../components/question/QuestionList';
import { useNavigate, useParams } from 'react-router-dom';
import { testAPI } from '../api/test';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { PAGE_TEST_ROUTE } from '../routes/routes';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { modalQuestionAddSetup, modalQuestionDeleteSetup, modalQuestionUpdateSetup, questionSlice } from '../reducers/questionSlice';
import { questionAPI } from '../api/question';
import { IQuestion } from '../type/question';
import ModalAdd from '../components/question/modalAdd';
import ModalUpdate from '../components/question/modalUpdate';
import ModalDelete from '../components/question/modalDelete';


const PageQuestion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {idTest} = useParams();
    const {data: tests, refetch} = testAPI.useFetchTestQuery(Number(idTest));

    useEffect(()=>{
        refetch();
    },[])

    const breadcrumbs = [
        <Link style={{cursor:'pointer'}} underline="hover" key="1" color="inherit" onClick={()=>navigate(PAGE_TEST_ROUTE)}>
            Tests
        </Link>,
        <Typography key="2" sx={{ color: 'text.primary' }}>Questions</Typography>,
    ];

    const [createQuestion] = questionAPI.useCreateQuestionMutation();
    const [updateQuestion] = questionAPI.useUpdateQuestionMutation();
    const [deleteQuestion] = questionAPI.useDeleteQuestionMutation();
    const {
        modalQuestionAddOpen, 
        modalQuestionUpdateOpen, modalQuestionUpdateObject,
        modalQuestionDeleteOpen, modalQuestionDeleteObject
    } = useSelector((state: RootState) => state.questionReducer);
    const modalAddExecute = () => {
        const modalAddQuestionName = document.getElementById('modalAddQuestionName') as HTMLInputElement;
        createQuestion({idTest:Number(idTest), question: {name:modalAddQuestionName.value} as IQuestion});
        dispatch(modalQuestionAddSetup({open:false,object:{} as IQuestion}))
    };
    const modalUpdateExecute = () => {
        const modalUpdateQuestionName = document.getElementById('modalUpdateQuestionName') as HTMLInputElement;
        updateQuestion({idTest:Number(idTest), question: {id: modalQuestionUpdateObject.id, name:modalUpdateQuestionName.value} as IQuestion});
        dispatch(modalQuestionUpdateSetup({open:false,object:{} as IQuestion}))
    };
    const modalDeleteExecute = () => {
        deleteQuestion({idTest:Number(idTest), idQuestion: modalQuestionDeleteObject.id});
        dispatch(modalQuestionDeleteSetup({open:false,object:{} as IQuestion}))
    };

    return(
        <div style={{width:'100%'}}>
            <Breadcrumbs sx={{marginBottom:'10px'}} separator={<NavigateNextIcon fontSize="small" />}>
                {breadcrumbs}
            </Breadcrumbs>
            
            <div style={{display:'block', fontSize: '1.2em', margin:'0 0 0 0'}}>
                <span style={{fontWeight: 'bold'}}>Test:</span> &nbsp;{tests && tests[0] && tests[0].name}
            </div>

            <QuestionList idTest={Number(idTest)} />

            <ModalAdd modalAddOpen={modalQuestionAddOpen} modalAddExecute={modalAddExecute} />
            <ModalUpdate modalUpdateOpen={modalQuestionUpdateOpen} modalUpdateExecute={modalUpdateExecute} />
            <ModalDelete modalDeleteOpen={modalQuestionDeleteOpen} modalDeleteExecute={modalDeleteExecute} />
        </div>
    )
};
export default PageQuestion;