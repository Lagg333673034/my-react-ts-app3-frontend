import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser } from '../type/user';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urlToAPIBackend_first } from './api';

const secondUrl = '/auth';

export const authAPI  =  createApi({
    reducerPath: 'authAPI',
    //baseQuery: baseQueryWithReauth,
    //baseQuery: fetchBaseQuery({baseUrl: urlToAPIBackend_first}),
    baseQuery: fetchBaseQuery({
        baseUrl: urlToAPIBackend_first,
        credentials: 'include',
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    }),
    endpoints: (build) => ({
        registrationUsingEmailPassword: build.mutation<IUser, IUser>({
            query:(user) => ({
                url: `${secondUrl}/registration-using-email-password`,
                method: 'POST',
                body: {
                    email: user.email,
                    password: user.password
                }
            }),
        }),
        registrationUsingGoogle: build.mutation<IUser, IUser>({
            query:(user) => ({
                url: `${secondUrl}/registration-using-google`,
                method: 'POST',
                body: {
                    email: user.email,
                }
            }),
        }),
        loginUsingEmailPassword: build.mutation<any, IUser>({
            query:(user) => ({
                url: `${secondUrl}/login-using-email-password`,
                method: 'POST',
                body: {
                    email: user.email,
                    password: user.password
                },
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
        refresh: build.query<any, any>({
            query:() => ({
                url: `${secondUrl}/refresh`,
                method: 'GET',
            }),
        }),
        lostLogout: build.query<any, any>({
            query:() => ({
                url: `${secondUrl}/logout`,
                method: 'GET',
            }),
        }),







        loginUsingGoogle: build.mutation<any, string>({
            query:(google_access_token) => ({
                url: `${secondUrl}/login-using-google`,
                method: 'POST',
                body: {
                    google_access_token: google_access_token,
                }
            }),
        }),

    })
});
