import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISiteSlice{
    userAuth: boolean;
    userEmail: string;
    modalSiteInfoOpen: boolean;

}
const initialState: ISiteSlice = {
    userAuth: false,
    userEmail: '',
    modalSiteInfoOpen: false,
}
export const siteSlice = createSlice({
    name:'site',
    initialState,
    reducers:{
        userSetup(state, action: PayloadAction<{userEmail:string,token:string}>){
            state.userAuth = true;
            state.userEmail = action.payload.userEmail;
            localStorage.setItem('token',action.payload.token);
        },
        userLogout(state){
            state.userAuth = false;
            state.userEmail = '';
            localStorage.removeItem('token');
        },
        modalSiteInfoSetup(state, action: PayloadAction<{open:boolean}>){
            state.modalSiteInfoOpen = action.payload.open;
        },
    }
})

export default siteSlice.reducer;

export const {userSetup,userLogout,modalSiteInfoSetup} = siteSlice.actions;