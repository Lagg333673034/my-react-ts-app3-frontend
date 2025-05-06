import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api';

const secondUrl = '/resultTest';

export const resultTestAPI = createApi({
    reducerPath: 'resultTestAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['resultTest'],
    endpoints: (build) => ({
        fetchResultTest: build.query<any[], {idTest:number}>({
            query:({idTest}) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/get`,
                method: 'POST',
                body: {
                    idTest: idTest,
                }
            }),
            providesTags: result => ['resultTest']

        }),
        fetchResultTestAnswers: build.query<any[], {idResultTest:number}>({
            query:({idResultTest}) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/getAnswers`,
                method: 'POST',
                body: {
                    idResultTest: idResultTest
                }
            }),
        }),
        fetchResultTestScore: build.query<any[], {idResultTest:number}>({
            query:({idResultTest}) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/getScore`,
                method: 'POST',
                body: {
                    idResultTest: idResultTest
                }
            }),
        }),
        saveResultTest: build.mutation<any, {idTest:number,timeStart:string,timeFinish:string,answers:any}>({
            query:({idTest,timeStart,timeFinish,answers}) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/save`,
                method: 'POST',
                body: {
                    idTest: idTest,
                    timeStart: timeStart,
                    timeFinish: timeFinish,
                    answers: answers
                }
            }),
        }),
        deleteResultTest: build.mutation<any, {idTest:number,id:number}>({
            query:({idTest,id}) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/delete`,
                method: 'POST',
                body: {
                    idTest: idTest,
                    id: id
                }
            }),
            invalidatesTags: ['resultTest']
        }),
    })
});


