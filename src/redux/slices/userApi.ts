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
  tagTypes: ['User'], // Define the tag types for caching
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/user',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }], // Invalidate user cache
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: '/user/login',
        method: 'POST',
        body: loginData,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }], // Invalidate user cache on login
    }),
    getUser: builder.query({
      query: () => '/user',
      providesTags: [{ type: 'User', id: 'LIST' }], // Provide a tag for the user list
    }),


    getUserById: builder.query({
      query: (userId) => ({
        url: `/user/${userId}`, // Fetch user by ID
        method: 'GET',
      }),
      providesTags: (result, error, userId) => 
        result ? [{ type: 'User', id: 'USER' }] : [], 
    }),
  }),
});

// Export hooks for usage in functional components 
export const { 
  useRegisterMutation, 
  useLoginMutation, 
  useGetUserQuery, 
  useGetUserByIdQuery 
} = api;
