import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urlToAPIBackend_first } from './api';

const secondUrl = '/system';

export const systemAPI  =  createApi({
    reducerPath: 'systemAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: urlToAPIBackend_first,
    }),
    endpoints: (build) => ({
        getCurrentSystemTime: build.mutation<any, any>({
            query:() => ({
                url: `${secondUrl}/getCurrentSystemTime`,
                method: 'POST',
            }),
        }),
    })
});
