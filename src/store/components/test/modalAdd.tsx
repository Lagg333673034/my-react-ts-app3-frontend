import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { modalTestAddSetup } from '../../reducers/testSlice';
import { ITest } from '../../type/test';
import { FormControl, TextField } from '@mui/material';


interface IModalAdd {
  modalAddOpen: boolean;
  modalAddExecute: () => void;
}
export default function ModalAdd({ modalAddOpen, modalAddExecute }: IModalAdd) {
  const dispatch = useDispatch();

  const modalAddClose = () =>{
    dispatch(modalTestAddSetup({open:false,object:{} as ITest}))
  }

  return (
    <Dialog open={modalAddOpen} onClose={modalAddClose}>
      <DialogTitle>Add new Test?</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <FormControl>
          <TextField
              type="text" placeholder="Test name" autoComplete='off' id="modalAddTestName" 
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
