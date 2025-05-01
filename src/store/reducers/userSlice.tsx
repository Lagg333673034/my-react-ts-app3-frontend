import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITest } from "../type/test";
import { IUser } from "../type/user";


interface IUestSlice{
    user: IUser;
    modalUserUpdateOpen: boolean;
    modalUserUpdateObject: IUser;
    modalUserDeleteOpen: boolean;
    modalUserDeleteObject: IUser;
}
const initialState: IUestSlice = {
    user: {} as IUser,
    modalUserUpdateOpen: false,
    modalUserUpdateObject: {} as IUser,
    modalUserDeleteOpen: false,
    modalUserDeleteObject: {} as IUser,
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        modalUserUpdateSetup(state, action: PayloadAction<{open:boolean,object:IUser}>){
            state.modalUserUpdateOpen = action.payload.open;
            state.modalUserUpdateObject = action.payload.object;
        },
        modalUserDeleteSetup(state, action: PayloadAction<{open:boolean,object:IUser}>){
            state.modalUserDeleteOpen = action.payload.open;
            state.modalUserDeleteObject = action.payload.object;
        },
    }
})

export default userSlice.reducer;