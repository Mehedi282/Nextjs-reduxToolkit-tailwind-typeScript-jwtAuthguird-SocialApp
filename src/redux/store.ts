'use client';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {api}  from './slices/userApi'; // Import your API slice
import userReducer  from './slices/isLogedIn';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer ,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
