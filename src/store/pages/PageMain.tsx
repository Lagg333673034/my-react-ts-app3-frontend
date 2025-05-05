import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGE_TEST_ROUTE } from '../routes/routes';

const PageMain = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        let loc = localStorage.getItem('required-location');
        localStorage.removeItem('required-location');
        if(loc && loc.length > 0){
            let val0=loc.split("/");
            let val1=val0[2];
            let val2=val0[3];
            navigate(`/ready-for-pass/${val1}/${val2}`);
        }else{
            navigate(PAGE_TEST_ROUTE);
        }
    },[])

    return(
        <div>

        </div>
    )
};
export default PageMain;