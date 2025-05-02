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


interface IModalAdd {
  modalAddOpen: boolean;
  modalAddExecute: () => void;
}
export default function ModalAdd({ modalAddOpen, modalAddExecute }: IModalAdd) {
  const dispatch = useDispatch();
  const {modalQuestionAddSetup} = questionSlice.actions;

  const modalAddClose = () =>{
    dispatch(modalQuestionAddSetup({open:false,object:{} as IQuestion}))
  }

  return (
    <Dialog open={modalAddOpen} onClose={modalAddClose}>
      <DialogTitle>Add new Question?</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <FormControl>
          <TextField
              type="text" placeholder="Question name" autoComplete='off' id="modalAddQuestionName" 
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
