import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISiteSlice{
    userAuth: boolean;
    userEmail: string;
}
const initialState: ISiteSlice = {
    userAuth: false,
    userEmail: '',
}
export const siteSlice = createSlice({
    name:'site',
    initialState,
    reducers:{
        userSetup(state, action: PayloadAction<{userEmail:string,token:string}>){
            if(
                action.payload.userEmail && action.payload.userEmail.length > 0 &&
                action.payload.token && action.payload.token.length > 0 
            ){
                state.userAuth = true;
                state.userEmail = action.payload.userEmail;
                localStorage.setItem('token',action.payload.token);
            }
        },
        userLogout(state){
            state.userAuth = false;
            state.userEmail = '';
            localStorage.removeItem('token');
        },
    }
})

export default siteSlice.reducer;

export const {userSetup,userLogout} = siteSlice.actions;