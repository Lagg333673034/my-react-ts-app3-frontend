import React, {FC} from 'react';
import { ITest } from '../../type/test';
import { PAGE_TEST_RESULTS_ROUTE, PAGE_QUESTION_ROUTE, PAGE_TEST_ROUTE } from '../../routes/routes';
import { useNavigate, useParams } from 'react-router-dom';
import { testSlice } from '../../reducers/testSlice';
import { useDispatch } from 'react-redux';
import { IconButton, Popover, Typography } from '@mui/material';
import { AssignmentTurnedIn, Delete, Edit, FlagSharp, FormatListNumbered, Link, Public, PublicOff } from '@mui/icons-material';
import { testAPI } from '../../api/test';
import { urlToFrontend } from '../../api/api';


interface TestItemProps{
    test: ITest;
}
const TestItem: FC<TestItemProps> = ({test}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {modalTestUpdateSetup, modalTestDeleteSetup} = testSlice.actions;
  const [setReadyTest] = testAPI.useSetReadyTestMutation();
  const [setPublishedTest] = testAPI.useSetPublishedTestMutation();

  const handlerOpenTestResults = () => {
    navigate(PAGE_TEST_RESULTS_ROUTE+`/${test.id}`);
  }
  const handlerSelect = () => {
    navigate(PAGE_TEST_ROUTE+`/${test.id}`+PAGE_QUESTION_ROUTE);
  }
  const handlerSetReady = (testReady:number) =>{
    let newTestReady = 0;
    if(testReady == 0){
      newTestReady = 1;
    }
    setReadyTest({id:test.id,ready:newTestReady} as ITest);
  }
  const handlerSetPublished = (testPublished:number) =>{
    let newTestPublished = 0;
    if(testPublished == 0){
      newTestPublished = 1;
    }
    setPublishedTest({id:test.id,published:newTestPublished} as ITest);
  }
  const handlerCopyLinkForRegistred = (link:string) =>{
    navigator.clipboard.writeText(link);
    const popoverTittle = window.document.getElementById("popoverLinkTittle");
    if (popoverTittle !== null) {
      popoverTittle.innerHTML = "Link copied";
    }
  }
  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState<HTMLElement | null>(null);
  const popoverOpen = Boolean(popoverAnchorEl);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };
  
  return (
    <div key={test.id} style={{display:'flex', flexDirection:'row', flexWrap:'nowrap', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{fontSize:'16px'}}>
          {test.name}
        </div>
        <div>
          <IconButton size="medium" color='secondary' onClick={handlerOpenTestResults} title='Test results'>
            <AssignmentTurnedIn/>
          </IconButton>

          <IconButton size="medium" color={test.ready != 0 ? 'success' : 'error' } onClick={()=>handlerSetReady(test.ready)}
            title={test.ready != 0 ? 'Test ready for pass' : 'Test not ready for pass' }>
            <FlagSharp/>
          </IconButton>
          {test.ready != 0 ? 
            <IconButton size="medium" color='success' onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}
              onClick={()=>handlerCopyLinkForRegistred(`${urlToFrontend}/ready-for-pass/${test.id}/${test.uuid}`)}>
              <Link/>
              <Popover
                sx={{ pointerEvents: 'none' }} 
                anchorEl={popoverAnchorEl}
                open={popoverOpen} onClose={handlePopoverClose} 
                anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}
                transformOrigin={{vertical: 'top',horizontal: 'left',}}
              >
                <Typography sx={{p:1}} id="popoverLinkTittle">Click to copy link to test pass</Typography>
              </Popover>
            </IconButton>
          : '' }
          <IconButton size="medium" color='info' onClick={()=>handlerSetPublished(test.published)} 
            title={test.published != 0 ? 'The test is public' : 'The test is not public' }>
            {test.published != 0 ? <Public/> : <PublicOff/> }
          </IconButton>
          <IconButton size="medium" color='success' onClick={handlerSelect} title='Go to the questions list'>
            <FormatListNumbered/>
          </IconButton>
          <IconButton size="medium" color='warning' onClick={()=>dispatch(modalTestUpdateSetup({open:true,object:test}))} title='Edit test'>
            <Edit/>
          </IconButton>
          <IconButton size="medium" color='error' onClick={()=>dispatch(modalTestDeleteSetup({open:true,object:test}))} title='Delete test'>
            <Delete/>
          </IconButton>
        </div>
    </div>
  );
}

export default TestItem;
