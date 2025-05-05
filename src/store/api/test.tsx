import { ITest } from '../type/test';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api';


const secondUrl = '/test';

export const testAPI = createApi({
    reducerPath: 'testAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Test'],
    endpoints: (build) => ({
        fetchTest: build.query<ITest[], number>({
            query:(idTest:number) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/get`,
                method: 'POST',
                body: {
                    id: idTest
                }
            }),
            providesTags: result => ['Test']
        }),
        fetchReadyForPassTest: build.query<any[], {idTest:number,uuid:string}>({
            query:({idTest,uuid}) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/ready-for-pass`,
                method: 'POST',
                body: {
                    id: idTest,
                    uuid: uuid
                },
            }),
        }),
        createTest: build.mutation<ITest, ITest>({
            query:(test) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/create`,
                method: 'POST',
                body: {
                    name: test.name
                }
            }),
            invalidatesTags: ['Test']
        }),
        updateTest: build.mutation<ITest, ITest>({
            query:(test) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/update`,
                method: 'PATCH',
                body: {
                    id: test.id,
                    name: test.name
                }
            }),
            invalidatesTags: ['Test']
        }),
        setReadyTest: build.mutation<ITest, ITest>({
            query:(test) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/set-ready`,
                method: 'PATCH',
                body: {
                    id: test.id,
                    ready: test.ready
                }
            }),
            invalidatesTags: ['Test']
        }),
        setPublishedTest: build.mutation<ITest, ITest>({
            query:(test) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/set-published`,
                method: 'PATCH',
                body: {
                    id: test.id,
                    published: test.published
                }
            }),
            invalidatesTags: ['Test']
        }),
        deleteTest: build.mutation<ITest, number>({
            query:(idTest) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/delete`,
                method: 'DELETE',
                body: {
                    id: idTest,
                }
            }),
            invalidatesTags: ['Test']
        }),
    })
});


