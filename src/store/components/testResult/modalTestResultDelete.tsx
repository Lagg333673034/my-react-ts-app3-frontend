import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { modalTestResultDeleteSetup } from '../../reducers/testResultSlice';
import { ITestResult } from '../../type/testResult';
import { Button,  DialogContentText,  } from '@mui/material';

interface IModalTestResultDelete {
  modalTestResultDeleteOpen: boolean;
  modalTestResultDeleteExecute: () => void;
}
export default function ModalTestResultDelete({ modalTestResultDeleteOpen, modalTestResultDeleteExecute }: IModalTestResultDelete) {
  const dispatch = useDispatch();
  const {modalTestResultDeleteObject} = useSelector((state: RootState) => state.testResultReducer);

  const modalTestResultDeleteClose = () =>{
    dispatch(modalTestResultDeleteSetup({open:false,object:{} as ITestResult}))
  }

  return (
    <Dialog open={modalTestResultDeleteOpen} onClose={modalTestResultDeleteClose}>
      <DialogTitle>Delete result?</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <DialogContentText>
          {modalTestResultDeleteObject && modalTestResultDeleteObject.emailRegistred}
          {modalTestResultDeleteObject && modalTestResultDeleteObject.emailNotRegistred}
          ;&nbsp;&nbsp;
          {modalTestResultDeleteObject && modalTestResultDeleteObject.timeFinish}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button variant="contained" type="button" onClick={modalTestResultDeleteClose}>
          Cancel
          </Button>
        <Button variant="contained" type="button" onClick={modalTestResultDeleteExecute}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
