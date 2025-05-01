import React, {FC} from 'react';
import { IUser } from '../../type/user';
import { userSlice } from '../../reducers/userSlice';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import { Delete, Edit, FormatListBulleted } from '@mui/icons-material';

interface UserItemProps{
    user: IUser;
}
const UserItem: FC<UserItemProps> = ({user}) => {
  const dispatch = useDispatch();
  const {modalUserUpdateSetup, modalUserDeleteSetup} = userSlice.actions;

  return (
    <div key={user.id} style={{display:'flex', flexDirection:'row', flexWrap:'nowrap', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{fontSize:'16px'}}>
          {user.email}
        </div>
        <div>
          <IconButton size="medium" color='warning' onClick={()=>dispatch(modalUserUpdateSetup({open:true,object:user}))} title='Edit user'>
            <Edit/>
          </IconButton>
          <IconButton size="medium" color='error' onClick={()=>dispatch(modalUserDeleteSetup({open:true,object:user}))} title='Delete user'>
            <Delete/>
          </IconButton>
          </div>
    </div>
  );
}

export default UserItem;
