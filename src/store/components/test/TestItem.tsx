import React, {FC, useState} from 'react';
import { ITest } from '../../type/test';
import { PAGE_TEST_RESULTS_ROUTE, PAGE_QUESTION_ROUTE, PAGE_TEST_ROUTE } from '../../routes/routes';
import { useNavigate } from 'react-router-dom';
import { modalTestDeleteSetup, modalTestUpdateSetup } from '../../reducers/testSlice';
import { useDispatch } from 'react-redux';
import { IconButton, Tooltip } from '@mui/material';
import { AssignmentTurnedIn, Delete, Edit, FlagSharp, FormatListNumbered, Link, Public, PublicOff } from '@mui/icons-material';
import { testAPI } from '../../api/test';
import { urlToFrontend } from '../../api/api';


interface TestItemProps{
    test: ITest;
}
const TestItem: FC<TestItemProps> = ({test}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    if(testReady === 0){
      newTestReady = 1;
    }
    setReadyTest({id:test.id,ready:newTestReady} as ITest);
  }
  const handlerSetPublished = (testPublished:number) =>{
    let newTestPublished = 0;
    if(testPublished === 0){
      newTestPublished = 1;
    }
    setPublishedTest({id:test.id,published:newTestPublished} as ITest);
  }
  const [linkTittle,setLinkTittle] = useState<boolean>(false);
  const handlerCopyLinkForRegistred = (link:string) =>{
    navigator.clipboard.writeText(link);
    setLinkTittle(true);
  }
  
  return (
    <div key={test.id} style={{display:'flex', flexFlow: 'row', flexDirection:'row', flexWrap:'wrap', 
        justifyContent:'space-between', alignItems:'center', lineHeight:'1'}}>
        <div style={{fontSize:'16px',padding:'10px 10px'}}>
          {test.name} (Q:&nbsp;{test.questionCount})
        </div>
        <div>
          <Tooltip title='Test results'>
            <IconButton size="medium" color='secondary' onClick={handlerOpenTestResults} >
              <AssignmentTurnedIn/>
            </IconButton>
          </Tooltip>
          <Tooltip title={test.ready !== 0 ? 'Test ready for pass' : 'Test not ready for pass' }>
            <IconButton size="medium" color={test.ready !==0 ? 'success':'error'} onClick={()=>handlerSetReady(test.ready)}>
              <FlagSharp/>
            </IconButton>
          </Tooltip>
          {test.ready !== 0 ? 
            <Tooltip onOpen={()=>setLinkTittle(false)} title={linkTittle ? 'Link copied' : 'Click to copy link to test pass'}>
              <IconButton onClick={()=>handlerCopyLinkForRegistred(`${urlToFrontend}/ready-for-pass/${test.id}/${test.uuid}`)}
                size="medium" color='success'>
                <Link/>
              </IconButton>
            </Tooltip>
          : '' }
          <Tooltip title={test.published !== 0 ? 'The test is public' : 'The test is not public' }>
            <IconButton size="medium" color='info' onClick={()=>handlerSetPublished(test.published)}>
              {test.published !== 0 ? <Public/> : <PublicOff/> }
            </IconButton>
          </Tooltip>
          <Tooltip title="Go to the questions list">
            <IconButton size="medium" color='success' onClick={handlerSelect}>
              <FormatListNumbered/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit test">
            <IconButton size="medium" color='warning' onClick={()=>dispatch(modalTestUpdateSetup({open:true,object:test}))}>
              <Edit/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete test">
            <IconButton size="medium" color='error' onClick={()=>dispatch(modalTestDeleteSetup({open:true,object:test}))}>
              <Delete/>
            </IconButton>
          </Tooltip>
        </div>
    </div>
  );
}

export default TestItem;
