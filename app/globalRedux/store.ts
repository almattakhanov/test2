'use client';

import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {authApi} from "@/app/globalRedux/model/auth/api";


const rootReducer = combineReducers({
    // app: appReducer,
    // tabs: tabsReducer,
    // popups: popupsReducer,
    [authApi.reducerPath]: authApi.reducer,

})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
