import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urlToAPIBackend_first } from './api';
import { IUser } from '../type/user';

const secondUrl = '/auth';

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({baseUrl: urlToAPIBackend_first}),
    endpoints: (build) => ({
        registration: build.mutation<IUser, IUser>({
            query:(user) => ({
                url: `${secondUrl}/registration`,
                method: 'POST',
                body: {
                    email: user.email,
                    password: user.password
                }
            }),
        }),
        login: build.mutation<any, IUser>({
            query:(user) => ({
                url: `${secondUrl}/login`,
                method: 'POST',
                body: {
                    email: user.email,
                    password: user.password
                }
            }),
        }),
        checkAuth: build.query<any, any>({
            query:() => ({
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                url: `${secondUrl}/checkAuth`,
                method: 'GET',
            }),
        }),
    })
});


