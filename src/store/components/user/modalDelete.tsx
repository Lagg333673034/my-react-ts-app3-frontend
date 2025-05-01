import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { userSlice } from '../../reducers/userSlice';
import { IUser } from '../../type/user';


interface IModalDelete {
  modalDeleteOpen: boolean;
  modalDeleteExecute: () => void;
}
export default function ModalDelete({ modalDeleteOpen, modalDeleteExecute }: IModalDelete) {
  const dispatch = useDispatch();
  const {modalUserDeleteSetup} = userSlice.actions;
  const {modalUserDeleteObject} = useSelector((state: RootState) => state.userReducer);

  const modalDeleteClose = () =>{
    dispatch(modalUserDeleteSetup({open:false,object:{} as IUser}))
  }

  return (
    <Dialog open={modalDeleteOpen} onClose={modalDeleteClose}>
      <DialogTitle>Delete?</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <DialogContentText>
          {modalUserDeleteObject && modalUserDeleteObject.email}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button variant="contained" type="button" onClick={modalDeleteClose}>
          Cancel
          </Button>
        <Button variant="contained" type="button" onClick={modalDeleteExecute}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
