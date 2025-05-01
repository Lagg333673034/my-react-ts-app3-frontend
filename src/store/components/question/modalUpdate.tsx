import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { FormControl, TextField } from '@mui/material';
import { questionSlice } from '../../reducers/questionSlice';
import { IQuestion } from '../../type/question';


interface IModalUpdate {
  modalUpdateOpen: boolean;
  modalUpdateExecute: () => void;
}
export default function ModalUpdate({ modalUpdateOpen, modalUpdateExecute }: IModalUpdate) {
  const dispatch = useDispatch();
  const {modalQuestionUpdateSetup} = questionSlice.actions;
  const {modalQuestionUpdateObject} = useSelector((state: RootState) => state.questionReducer);

  const modalUpdateClose = () =>{
    dispatch(modalQuestionUpdateSetup({open:false,object:{} as IQuestion}))
  }

  return (
    <Dialog open={modalUpdateOpen} onClose={modalUpdateClose}>
      <DialogTitle>Update Question?</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <FormControl>
          <TextField
              type="text" placeholder="Name" autoComplete='off' id="modalUpdateQuestionName" 
              defaultValue={modalQuestionUpdateObject.name} 
              required fullWidth variant="outlined" color={'primary'}
          />
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3, justifyContent:'space-between'}}>
        <Button variant="contained" type="button" onClick={modalUpdateClose}>
          Cancel
        </Button>
        <Button variant="contained" type="button" onClick={modalUpdateExecute}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
