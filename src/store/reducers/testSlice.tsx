import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITest } from "../type/test";


interface ITestSlice{
    test: ITest;
    modalTestAddOpen: boolean;
    modalTestAddObject: ITest;
    modalTestUpdateOpen: boolean;
    modalTestUpdateObject: ITest;
    modalTestDeleteOpen: boolean;
    modalTestDeleteObject: ITest;
}
const initialState: ITestSlice = {
    test: {} as ITest,
    modalTestAddOpen: false,
    modalTestAddObject: {} as ITest,
    modalTestUpdateOpen: false,
    modalTestUpdateObject: {} as ITest,
    modalTestDeleteOpen: false,
    modalTestDeleteObject: {} as ITest,
}

export const testSlice = createSlice({
    name:'test',
    initialState,
    reducers:{
        modalTestAddSetup(state, action: PayloadAction<{open:boolean,object:ITest}>){
            state.modalTestAddOpen = action.payload.open;
            state.modalTestAddObject = action.payload.object;
        },
        modalTestUpdateSetup(state, action: PayloadAction<{open:boolean,object:ITest}>){
            state.modalTestUpdateOpen = action.payload.open;
            state.modalTestUpdateObject = action.payload.object;
        },
        modalTestDeleteSetup(state, action: PayloadAction<{open:boolean,object:ITest}>){
            state.modalTestDeleteOpen = action.payload.open;
            state.modalTestDeleteObject = action.payload.object;
        },
    }
})

export default testSlice.reducer;