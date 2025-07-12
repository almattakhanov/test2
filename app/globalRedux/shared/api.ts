import { Mutex } from 'async-mutex';
import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { endpoint, ...rest }) => {
        const token = localStorage.getItem('access_token');

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        headers.set('Content-Type', 'application/json');
        headers.set('CityId', '1');

        return headers;
    },
});

import { useRouter } from 'next/router';

// Вынеси router наружу, чтобы иметь доступ к нему внутри baseQueryWithReauth
let router: ReturnType<typeof useRouter> | null = null;

export const setRouter = (r: ReturnType<typeof useRouter>) => {
    router = r;
};

const mutex = new Mutex();

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (
        result.error &&
        (result.error.status === 401 ||
            // @ts-ignore
            result.error.originalStatus === 401 ||
            result.error.status === 403)
    ) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshToken = localStorage.getItem('refresh_token');

                if (refreshToken) {
                    const refreshResult = await baseQueryNoAuth(
                        {
                            url: '/user-service-go/v1/auth/refresh',
                            method: 'POST',
                            body: { refresh_token: refreshToken },
                        },
                        api,
                        extraOptions
                    );

                    if (refreshResult.data) {
                        // @ts-ignore
                        const { jwt_token, refresh_token } = refreshResult.data.data;

                        localStorage.setItem('access_token', jwt_token);
                        localStorage.setItem('refresh_token', refresh_token);

                        // повторяем исходный запрос
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');

                        if (router) {
                            router.push('/login');
                        }
                    }
                } else {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');

                    if (router) {
                        router.push('/login');
                    }
                }
            } finally {
                release();
            }
        } else {
            // если refresh уже идет — ждем его окончания
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

// const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions);
//
//     if (
//         result.error &&
//         (result.error.status === 401 ||
//             // @ts-ignore
//             result.error.originalStatus === 401 ||
//             result.error.status === 403)
//     ) {
//         const refreshToken = localStorage.getItem('refresh_token');
//
//         if (refreshToken) {
//             // Используем baseQuery БЕЗ Authorization для refresh-запроса
//             const refreshResult = await baseQueryNoAuth(
//                 {
//                     url: '/user-service-go/v1/auth/refresh',
//                     method: 'POST',
//                     body: { refresh_token: refreshToken },
//                 },
//                 api,
//                 extraOptions
//             );
//
//             if (refreshResult.data) {
//                 // @ts-ignore
//                 const { jwt_token, refresh_token } = refreshResult.data.data;
//
//                 localStorage.setItem('access_token', jwt_token);
//                 localStorage.setItem('refresh_token', refresh_token);
//
//                 // Повторяем исходный запрос уже с новым токеном
//                 result = await baseQuery(args, api, extraOptions);
//             } else {
//               //  localStorage.removeItem('access_token');
//              //   localStorage.removeItem('refresh_token');
//
//                 if (router) {
//                     router.push('/login');
//                 }
//             }
//         } else {
//           //  localStorage.removeItem('access_token');
//           //  localStorage.removeItem('refresh_token');
//
//             if (router) {
//                 router.push('/login');
//             }
//         }
//     }
//
//     return result;
// };


export const baseApi = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Address', 'Cart', 'Favorites', 'Order'],
    keepUnusedDataFor: 600,
    endpoints: () => ({}),
});

const baseQueryNoAuth = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});