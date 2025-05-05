import { IUser } from '../type/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urlToAPIBackend_first } from './api';

const secondUrl = '/user';

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: urlToAPIBackend_first}),
    tagTypes: ['User'],
    endpoints: (build) => ({
        fetchUserOne: build.query<IUser, any>({
            query:() => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/getOne`,
                method: 'POST',
            }),
            providesTags: result => ['User']
        }),
        fetchUserAll: build.query<IUser[], any>({
            query:() => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/getAll`,
                method: 'POST',
            }),
            providesTags: result => ['User']
        }),
        updateUser: build.mutation<IUser, IUser>({
            query:(user) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/update`,
                method: 'PATCH',
                body: {
                    id: user.id,
                    email: user.email
                }
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: build.mutation<IUser, number>({
            query:(idUser) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/delete`,
                method: 'DELETE',
                body: {
                    id:idUser, 
                }
            }),
            invalidatesTags: ['User']
        }),
    })
});


