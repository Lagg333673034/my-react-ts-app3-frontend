import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGE_TEST_ROUTE } from '../routes/routes';

const PageMain = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate(PAGE_TEST_ROUTE);
    },[])

    return(
        <div>

        </div>
    )
};
export default PageMain;