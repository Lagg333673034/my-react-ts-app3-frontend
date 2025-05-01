import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuestion } from "../type/question";

interface IQuestionSlice{
    question: IQuestion;
    modalQuestionAddOpen: boolean;
    modalQuestionAddObject: IQuestion;
    modalQuestionUpdateOpen: boolean;
    modalQuestionUpdateObject: IQuestion;
    modalQuestionDeleteOpen: boolean;
    modalQuestionDeleteObject: IQuestion;
}
const initialState: IQuestionSlice = {
    question: {} as IQuestion,
    modalQuestionAddOpen: false,
    modalQuestionAddObject: {} as IQuestion,
    modalQuestionUpdateOpen: false,
    modalQuestionUpdateObject: {} as IQuestion,
    modalQuestionDeleteOpen: false,
    modalQuestionDeleteObject: {} as IQuestion,
}

export const questionSlice = createSlice({
    name:'question',
    initialState,
    reducers:{
        modalQuestionAddSetup(state, action: PayloadAction<{open:boolean,object:IQuestion}>){
            state.modalQuestionAddOpen = action.payload.open;
            state.modalQuestionAddObject = action.payload.object;
        },
        modalQuestionUpdateSetup(state, action: PayloadAction<{open:boolean,object:IQuestion}>){
            state.modalQuestionUpdateOpen = action.payload.open;
            state.modalQuestionUpdateObject = action.payload.object;
        },
        modalQuestionDeleteSetup(state, action: PayloadAction<{open:boolean,object:IQuestion}>){
            state.modalQuestionDeleteOpen = action.payload.open;
            state.modalQuestionDeleteObject = action.payload.object;
        },
    }
})

export default questionSlice.reducer;