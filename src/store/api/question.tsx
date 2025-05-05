import { IQuestion } from '../type/question';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api';

const secondUrl = '/question';

export const questionAPI = createApi({
    reducerPath: 'questionAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Question'],
    endpoints: (build) => ({
        fetchQuestion: build.query<IQuestion[],{idTest:number,idQuestion:number}>({
            query:({idTest,idQuestion}) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/get`,
                method: 'POST',
                body: {
                    idTest: idTest,
                    id: idQuestion
                }
            }),
            providesTags: result => ['Question']
        }),
        createQuestion: build.mutation<IQuestion, {idTest:number,question:IQuestion}>({
            query:({idTest,question}) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/create`,
                method: 'POST',
                body: {
                    idTest: idTest,
                    name: question.name,
                }
            }),
            invalidatesTags: ['Question']
        }),
        updateQuestion: build.mutation<IQuestion, {idTest:number,question:IQuestion}>({
            query:({idTest,question}) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/update`,
                method: 'PATCH',
                body: {
                    idTest: idTest,
                    id: question.id,
                    name: question.name,
                }
            }),
            invalidatesTags: ['Question']
        }),
        deleteQuestion: build.mutation<IQuestion, {idTest:number,idQuestion:number}>({
            query:({idTest,idQuestion}) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/delete`,
                method: 'DELETE',
                body: {
                    idTest: idTest,
                    id: idQuestion,
                }
            }),
            invalidatesTags: ['Question']
        }),
    })
});


