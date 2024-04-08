import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3001';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/user',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: '/user/login',
        method: 'POST',
        body: loginData,
      }),
    }),
    getUser: builder.query({
      query: () => '/user'
    }),
    getUserById: builder.query({
      query: (id) => {
        const userId = localStorage.getItem('userId');
        return {
          url: `/user/${userId}`, // Adjust the endpoint according to your backend API's endpoint for fetching user by id
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserQuery, useGetUserByIdQuery } = api;
