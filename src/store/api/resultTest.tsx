import { ITest } from '../type/test';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urlToAPIBackend_first } from './api';

const secondUrl = '/resultTest';

export const resultTestAPI = createApi({
    reducerPath: 'resultTestAPI',
    baseQuery: fetchBaseQuery({baseUrl: urlToAPIBackend_first}),
    endpoints: (build) => ({
        fetchResultTest: build.query<any[], {idTest:number,id?:number}>({
            query:({idTest,id}) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/get`,
                method: 'POST',
                body: {
                    idTest: idTest,
                    id: id
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

    })
});


