import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { testResultSlice } from '../../reducers/testResultSlice';
import { ITestResult } from '../../type/testResult';


interface IModalTestResult {
  modalTestResultOpen: boolean;
}
export default function ModalTestResult({ modalTestResultOpen }: IModalTestResult) {
  const dispatch = useDispatch();
  const {modalTestResultSetup} = testResultSlice.actions;
  const {modalTestResultObject} = useSelector((state: RootState) => state.testResultReducer);

  const modalTestResultClose = () =>{
    dispatch(modalTestResultSetup({open:false,object:{} as ITestResult}))
  }

  return (
    <Dialog open={modalTestResultOpen} onClose={modalTestResultClose} className='modalTestResult'>
      <DialogTitle className='modalTestResult'>Result</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <div>
          Test name: {modalTestResultObject.testName}
        </div>
        <div>
          Who took the test: {modalTestResultObject.emailRegistred !='' ? modalTestResultObject.emailRegistred : modalTestResultObject.emailNotRegistred}
        </div>
        <div>
          Finish time: {modalTestResultObject.timeFinish}
        </div>












        
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button variant="contained" type="button" onClick={modalTestResultClose}>
          Cancel
          </Button>
      </DialogActions>
    </Dialog>
  );
}
