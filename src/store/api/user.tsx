import { IUser } from '../type/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urlToAPIBackend_first } from './api';

const secondUrl = '/user';

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: urlToAPIBackend_first}),
    tagTypes: ['User'],
    endpoints: (build) => ({
        fetchUser: build.query<IUser[], number>({
            query:(id:number) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/get`,
                method: 'POST',
                body: {
                    id: id
                }
            }),
            providesTags: result => ['User']
        }),
        /*createUser: build.mutation<IUser, IUser>({
            query:(user) => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/create`,
                method: 'POST',
                body: {
                    email: user.email,
                    password: user.password
                }
            }),
            invalidatesTags: ['User']
        }),*/
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


