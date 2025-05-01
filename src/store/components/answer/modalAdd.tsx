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
import { answerSlice } from '../../reducers/answerSlice';
import { IAnswer } from '../../type/answer';


interface IModalAdd {
  modalAddOpen: boolean;
  modalAddExecute: () => void;
}
export default function ModalAdd({ modalAddOpen, modalAddExecute }: IModalAdd) {
  const dispatch = useDispatch();
  const {modalAnswerAddSetup} = answerSlice.actions;
  const {modalAnswerAddObject} = useSelector((state: RootState) => state.answerReducer);

  const modalAddClose = () =>{
    dispatch(modalAnswerAddSetup({open:false,object:{} as IAnswer}))
  }

  return (
    <Dialog open={modalAddOpen} onClose={modalAddClose}>
      <DialogTitle>Add new Answer?</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <FormControl>
          <TextField
              type="text" placeholder="Answer name" autoComplete='off' id="modalAddAnswerName" 
              required fullWidth variant="outlined" color={'primary'} autoFocus
          />
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3, justifyContent:'space-between'}}>
        <Button variant="contained" type="button" onClick={modalAddClose}>
          Cancel
        </Button>
        <Button variant="contained" type="button" onClick={modalAddExecute}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
