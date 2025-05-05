
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {BaseQueryFn,FetchArgs,FetchBaseQueryError,} from '@reduxjs/toolkit/query'
import { userLogout, userSetup } from '../reducers/siteSlice';


//export const urlToAPIBackend_first = "http://localhost:5000/api";
//export const urlToFrontend = "http://localhost:3000";
export const urlToAPIBackend_first = "https://my-react-ts-app3-backend.onrender.com/api"
export const urlToFrontend = "https://lagg333673034-my-test-app.netlify.app";


export function getCurrentDataTime() {
    let datetime = new Date();
    let year = datetime.getFullYear();
    let month = datetime.getMonth() + 1;
    let day = datetime.getDate();
    let hour = datetime.getHours();
    let minute = datetime.getMinutes();
    let second = datetime.getSeconds();

    let m = month.toString().padStart(2, '0');
    let d = day.toString().padStart(2, '0');
    let h = hour.toString().padStart(2, '0');
    let min = minute.toString().padStart(2, '0');
    let sec = second.toString().padStart(2, '0');

    //return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return `${year}-${m}-${d} ${h}:${min}:${sec}`;
}

const baseQuery = fetchBaseQuery({
    baseUrl: urlToAPIBackend_first,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if(token && token.length > 0){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
});
export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs,unknown,FetchBaseQueryError> = async (args,api,extraOptions) => {
  let result = await baseQuery(args,api,extraOptions);
  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(`${urlToAPIBackend_first}/auth/refresh`,api,extraOptions) as any
    if (refreshResult?.data) {
        api.dispatch(userSetup({
            userEmail: refreshResult.data.user.email,
            token: refreshResult.data.token,
        }))
        result = await baseQuery(args, api, extraOptions)
    } else {
        api.dispatch(userLogout())
    }
  }
  return result
}

