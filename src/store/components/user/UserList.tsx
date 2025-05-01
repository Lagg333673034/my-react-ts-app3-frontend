import React, { FC, useEffect, useState } from 'react';
import {userAPI} from '../../api/user';
import UserItem from './UserItem';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Loader from '../loader/loader';



const UserList: FC = () => {
    const {data: users, isError, isLoading, refetch} = userAPI.useFetchUserQuery(0 /*, {pollingInterval: 2000}*/);

    useEffect(()=>{
        refetch();
    },[])

    return(
        <div style={{width:'100%', textAlign:'center'}}>
            {isLoading ? <div><Loader/></div> : ''}
            {isError ? <div>Error: data fetching error</div> : ''}

            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small">
                <TableBody>
                {users && users.map((user,index) => (
                    <TableRow hover key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                            {index+=1}
                        </TableCell>
                        <TableCell>
                            <UserItem key={user.id} user={user} />
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}

export default UserList;