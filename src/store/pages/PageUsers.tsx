import React from 'react';
import UserList from '../components/user/UserList';
import { useDispatch } from 'react-redux';
import { userAPI } from '../api/user';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { userSlice } from '../reducers/userSlice';
import { IUser } from '../type/user';
import ModalUpdate from '../components/user/modalUpdate';
import ModalDelete from '../components/user/modalDelete';
import { Breadcrumbs, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';


const PageUser = () => {
    const dispatch = useDispatch();

    const breadcrumbs = [
        <Typography key="1" sx={{ color: 'text.primary' }}>Users</Typography>,
    ];

    const [updateUser] = userAPI.useUpdateUserMutation();
    const [deleteUser] = userAPI.useDeleteUserMutation();
    const {
        modalUserUpdateOpen, modalUserUpdateObject,
        modalUserDeleteOpen, modalUserDeleteObject
    } = useSelector((state: RootState) => state.userReducer);
    const {        modalUserUpdateSetup,
        modalUserDeleteSetup
    } = userSlice.actions;


    const modalUpdateExecute = () => {
        const modalUpdateUserEmail = document.getElementById('modalUpdateUserEmail') as HTMLInputElement;
        updateUser({id: modalUserUpdateObject.id, email: modalUpdateUserEmail.value} as IUser);
        dispatch(modalUserUpdateSetup({open:false,object:{} as IUser}))
    };
    const modalDeleteExecute = () => {
        deleteUser(modalUserDeleteObject.id);
        dispatch(modalUserDeleteSetup({open:false,object:{} as IUser}))
    };

    return(
        <div style={{width:'100%'}}>
            <Breadcrumbs sx={{marginBottom:'10px'}} separator={<NavigateNext fontSize="small" />}>
                {breadcrumbs}
            </Breadcrumbs>
            
            <UserList />

            <ModalUpdate modalUpdateOpen={modalUserUpdateOpen} modalUpdateExecute={modalUpdateExecute} />
            <ModalDelete modalDeleteOpen={modalUserDeleteOpen} modalDeleteExecute={modalDeleteExecute} />
        </div>
    )
};
export default PageUser;