import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAnswer } from "../type/answer";

interface IAnswerSlice{
    answer: IAnswer;
    modalAnswerAddOpen: boolean;
    modalAnswerAddObject: IAnswer;
    modalAnswerUpdateOpen: boolean;
    modalAnswerUpdateObject: IAnswer;
    modalAnswerDeleteOpen: boolean;
    modalAnswerDeleteObject: IAnswer;
}
const initialState: IAnswerSlice = {
    answer: {} as IAnswer,
    modalAnswerAddOpen: false,
    modalAnswerAddObject: {} as IAnswer,
    modalAnswerUpdateOpen: false,
    modalAnswerUpdateObject: {} as IAnswer,
    modalAnswerDeleteOpen: false,
    modalAnswerDeleteObject: {} as IAnswer,
}

export const answerSlice = createSlice({
    name:'answer',
    initialState,
    reducers:{
        modalAnswerAddSetup(state, action: PayloadAction<{open:boolean,object:IAnswer}>){
            state.modalAnswerAddOpen = action.payload.open;
            state.modalAnswerAddObject = action.payload.object;
        },
        modalAnswerUpdateSetup(state, action: PayloadAction<{open:boolean,object:IAnswer}>){
            state.modalAnswerUpdateOpen = action.payload.open;
            state.modalAnswerUpdateObject = action.payload.object;
        },
        modalAnswerDeleteSetup(state, action: PayloadAction<{open:boolean,object:IAnswer}>){
            state.modalAnswerDeleteOpen = action.payload.open;
            state.modalAnswerDeleteObject = action.payload.object;
        },
    }
})

export default answerSlice.reducer;