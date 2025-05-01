import { IAnswer } from '../type/answer';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urlToAPIBackend_first } from './api';

const secondUrl = '/answer';

export const answerAPI = createApi({
    reducerPath: 'answerAPI',
    baseQuery: fetchBaseQuery({baseUrl: urlToAPIBackend_first}),
    tagTypes: ['Answer'],
    endpoints: (build) => ({
        fetchAnswer: build.query<IAnswer[],{idQuestion:number,idAnswer:number}>({
            query:({idQuestion,idAnswer}) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/get`,
                method: 'POST',
                body:{
                    idQuestion: idQuestion,
                    id: idAnswer
                }
            }),
            providesTags: result => ['Answer']
        }),
        createAnswer: build.mutation<IAnswer, {idQuestion:number,answer:IAnswer}>({
            query:({idQuestion,answer}) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/create`,
                method: 'POST',
                body: {
                    idQuestion: idQuestion,
                    name: answer.name
                }
            }),
            invalidatesTags: ['Answer']
        }),
        updateAnswer: build.mutation<IAnswer, {idQuestion:number,answer:IAnswer}>({
            query:({idQuestion,answer}) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/update`,
                method: 'PATCH',
                body: {
                    idQuestion: idQuestion,
                    id: answer.id,
                    name: answer.name,
                }
            }),
            invalidatesTags: ['Answer']
        }),
        setCorrectAnswer: build.mutation<IAnswer, {idQuestion:number,answer:IAnswer}>({
            query:({idQuestion,answer}) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/set-correct`,
                method: 'PATCH',
                body: {
                    idQuestion: idQuestion,
                    id: answer.id,
                    correct: answer.correct,
                }
            }),
            invalidatesTags: ['Answer']
        }),
        deleteAnswer: build.mutation<IAnswer, {idQuestion:number,idAnswer:number}>({
            query:({idQuestion,idAnswer}) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/delete`,
                method: 'DELETE',
                body: {
                    idQuestion: idQuestion,
                    id: idAnswer,
                }
            }),
            invalidatesTags: ['Answer']
        }),
    })
});


