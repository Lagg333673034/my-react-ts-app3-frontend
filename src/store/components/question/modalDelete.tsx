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
import { modalQuestionDeleteSetup } from '../../reducers/questionSlice';
import { IQuestion } from '../../type/question';


interface IModalDelete {
  modalDeleteOpen: boolean;
  modalDeleteExecute: () => void;
}
export default function ModalDelete({ modalDeleteOpen, modalDeleteExecute }: IModalDelete) {
  const dispatch = useDispatch();
  const {modalQuestionDeleteObject} = useSelector((state: RootState) => state.questionReducer);

  const modalDeleteClose = () =>{
    dispatch(modalQuestionDeleteSetup({open:false,object:{} as IQuestion}))
  }

  return (
    <Dialog open={modalDeleteOpen} onClose={modalDeleteClose}>
      <DialogTitle>Delete?</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <DialogContentText>
          {modalQuestionDeleteObject && modalQuestionDeleteObject.name}
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
