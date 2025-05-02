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
        restorePasswordSendEmail: build.mutation<any, string>({
            query:(emailToRestorePassword) => ({
                url: `${secondUrl}/restore-password-send-email`,
                method: 'POST',
                body: {
                    email: emailToRestorePassword
                }
            }),
        }),
        restorePasswordChangePassword: build.mutation<any, {uuid:string,newPassword:string}>({
            query:({uuid,newPassword}) => ({
                url: `${secondUrl}/restore-password-change-password`,
                method: 'POST',
                body: {
                    uuid:uuid,
                    newPassword:newPassword
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


