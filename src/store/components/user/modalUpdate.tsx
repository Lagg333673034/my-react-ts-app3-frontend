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
import { IUser } from '../../type/user';
import { modalUserUpdateSetup } from '../../reducers/userSlice';


interface IModalUpdate {
  modalUpdateOpen: boolean;
  modalUpdateExecute: () => void;
}
export default function ModalUpdate({ modalUpdateOpen, modalUpdateExecute }: IModalUpdate) {
  const dispatch = useDispatch();
  const {modalUserUpdateObject} = useSelector((state: RootState) => state.userReducer);

  const modalUpdateClose = () =>{
    dispatch(modalUserUpdateSetup({open:false,object:{} as IUser}))
  }

  return (
    <Dialog open={modalUpdateOpen} onClose={modalUpdateClose}>
      <DialogTitle>Update User?</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <FormControl>
          <TextField
              type="text" placeholder="Email" autoComplete='off' id="modalUpdateUserEmail" 
              defaultValue={modalUserUpdateObject.email} 
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
