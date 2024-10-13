'use client';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {api}  from './slices/userApi'; // Import your API slice
import userReducer  from './slices/isLogedIn';
import { userDetailsApi } from './slices/editProfileApi';
import { postApi } from './slices/postApi';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userDetailsApi.reducerPath]: userDetailsApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    user: userReducer ,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, userDetailsApi.middleware, postApi.middleware),
});

setupListeners(store.dispatch);
