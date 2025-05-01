import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITestResult } from "../type/testResult";


interface ITestResultSlice{
    modalTestResultOpen: boolean;
    modalTestResultObject: ITestResult;
}
const initialState: ITestResultSlice = {
    modalTestResultOpen: false,
    modalTestResultObject: {} as ITestResult,
}

export const testResultSlice = createSlice({
    name:'testResult',
    initialState,
    reducers:{
        modalTestResultSetup(state, action: PayloadAction<{open:boolean,object:ITestResult}>){
            state.modalTestResultOpen = action.payload.open;
            state.modalTestResultObject = action.payload.object;
        },
    }
})

export default testResultSlice.reducer;