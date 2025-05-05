import React from 'react';
import TestList from '../components/test/TestList';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { modalTestAddSetup, modalTestDeleteSetup, modalTestUpdateSetup } from '../reducers/testSlice';
import { ITest } from '../type/test';
import ModalAdd from '../components/test/modalAdd';
import ModalUpdate from '../components/test/modalUpdate';
import ModalDelete from '../components/test/modalDelete';
import { testAPI } from '../api/test';


const PageTest = () => {
    const dispatch = useDispatch();

    const breadcrumbs = [
        <Typography key="1" sx={{ color: 'text.primary' }}>Tests</Typography>,
    ];

    const [createTest] = testAPI.useCreateTestMutation();
    const [updateTest] = testAPI.useUpdateTestMutation();
    const [deleteTest] = testAPI.useDeleteTestMutation();
    const {
        modalTestAddOpen, 
        modalTestUpdateOpen, modalTestUpdateObject,
        modalTestDeleteOpen, modalTestDeleteObject
    } = useSelector((state: RootState) => state.testReducer);
    const modalAddExecute = () => {
        const modalAddTestName = document.getElementById('modalAddTestName') as HTMLInputElement;
        createTest({name: modalAddTestName.value} as ITest);
        dispatch(modalTestAddSetup({open:false,object:{} as ITest}))
    };
    const modalUpdateExecute = () => {
        const modalUpdateTestName = document.getElementById('modalUpdateTestName') as HTMLInputElement;
        updateTest({id: modalTestUpdateObject.id, name: modalUpdateTestName.value} as ITest);
        dispatch(modalTestUpdateSetup({open:false,object:{} as ITest}))
    };
    const modalDeleteExecute = () => {
        deleteTest(modalTestDeleteObject.id);
        dispatch(modalTestDeleteSetup({open:false,object:{} as ITest}))
    };

    return(
        <div style={{width:'100%'}}>
            <Breadcrumbs sx={{marginBottom:'10px'}} separator={<NavigateNextIcon fontSize="small" />}>
                {breadcrumbs}
            </Breadcrumbs>

            <TestList />

            <ModalAdd modalAddOpen={modalTestAddOpen} modalAddExecute={modalAddExecute} />
            <ModalUpdate modalUpdateOpen={modalTestUpdateOpen} modalUpdateExecute={modalUpdateExecute} />
            <ModalDelete modalDeleteOpen={modalTestDeleteOpen} modalDeleteExecute={modalDeleteExecute} />
        </div>
    )
};
export default PageTest;