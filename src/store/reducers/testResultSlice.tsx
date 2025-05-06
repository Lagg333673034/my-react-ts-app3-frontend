import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITestResult } from "../type/testResult";


interface ITestResultSlice{
    modalTestResultOpen: boolean;
    modalTestResultObject: ITestResult;
    modalTestResultDeleteOpen: boolean;
    modalTestResultDeleteObject: ITestResult;
}
const initialState: ITestResultSlice = {
    modalTestResultOpen: false,
    modalTestResultObject: {} as ITestResult,
    modalTestResultDeleteOpen: false,
    modalTestResultDeleteObject: {} as ITestResult,
}

export const testResultSlice = createSlice({
    name:'testResult',
    initialState,
    reducers:{
        modalTestResultSetup(state, action: PayloadAction<{open:boolean,object:ITestResult}>){
            state.modalTestResultOpen = action.payload.open;
            state.modalTestResultObject = action.payload.object;
        },
        modalTestResultDeleteSetup(state, action: PayloadAction<{open:boolean,object:ITestResult}>){
            state.modalTestResultDeleteOpen = action.payload.open;
            state.modalTestResultDeleteObject = action.payload.object;
        },
    }
})

export default testResultSlice.reducer;

export const {modalTestResultSetup,modalTestResultDeleteSetup} = testResultSlice.actions;