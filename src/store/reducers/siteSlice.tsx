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
        userSetup(state, action: PayloadAction<any>){
            state.userAuth = true;
            state.userEmail = action.payload.userEmail;
            localStorage.setItem('token',action.payload.token);
        },
        userLogout(state){
            state.userAuth = false;
            state.userEmail = 'false';
            localStorage.removeItem('token');
        },
    }
})

export default siteSlice.reducer;