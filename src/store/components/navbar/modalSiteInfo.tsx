import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { modalSiteInfoSetup } from '../../reducers/siteSlice';


interface IModalSiteInfo {
  modalSiteInfoOpen: boolean;
}
export default function ModalSiteInfo({ modalSiteInfoOpen }: IModalSiteInfo) {
  const dispatch = useDispatch();

  const modalSiteInfoClose = () =>{
    dispatch(modalSiteInfoSetup({open:false}))
  }

  return (
    <Dialog open={modalSiteInfoOpen} onClose={modalSiteInfoClose}>
      <DialogTitle>Site information</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        1. You can create simple tests on this site. <br />
        2. You can give a link to this test to other people to pass. <br />
        3. The person who created the test can see the test results. <br />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3, justifyContent:'space-between'}}>
        <Button variant="contained" type="button" onClick={modalSiteInfoClose}>
          Cancel
          </Button>
      </DialogActions>
    </Dialog>
  );
}
