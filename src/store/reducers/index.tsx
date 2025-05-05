import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { authAPI } from "../api/auth";
import { userAPI } from "../api/user";
import { testAPI } from "../api/test";
import { resultTestAPI } from "../api/resultTest";
import { questionAPI } from "../api/question";
import { answerAPI } from "../api/answer";

import siteReducer from "./siteSlice";
import userReducer from "./userSlice";
import testReducer from "./testSlice";
import testResultReducer from "./testResultSlice";
import questionReducer from "./questionSlice";
import answerReducer from "./answerSlice";


const rootReducer = combineReducers({
    siteReducer,
    userReducer,
    testReducer,
    testResultReducer,
    questionReducer,
    answerReducer,

    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [testAPI.reducerPath]: testAPI.reducer,
    [resultTestAPI.reducerPath]: resultTestAPI.reducer,
    [questionAPI.reducerPath]: questionAPI.reducer,
    [answerAPI.reducerPath]: answerAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(authAPI.middleware)
        .concat(userAPI.middleware)
        .concat(testAPI.middleware)
        .concat(resultTestAPI.middleware)
        .concat(questionAPI.middleware)
        .concat(answerAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

