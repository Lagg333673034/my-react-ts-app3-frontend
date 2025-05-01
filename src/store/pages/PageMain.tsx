import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import {v4 as uuidv4} from 'uuid'
import { PAGE_TEST_ROUTE } from '../routes/routes';

const PageMain = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate(PAGE_TEST_ROUTE);
    },[])
    
    return(
        <div>
            {/*uuidv4()*/}
            1b1e0491-3d37-4194-8650-844686aafd3d<br/>
            Main page<br/>
            Spisok testov, kotorie polzovaeli sdelali obshedostypnimi s filtrom<br/>
            Tablica - cells - nazvanie testa, email<br/>
        </div>
    )
};
export default PageMain;