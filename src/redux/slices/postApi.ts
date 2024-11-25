import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3001';

export const postApi = createApi({
  reducerPath: 'postApi',
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
  tagTypes: ['Posts','User'], // Define tag types for invalidation
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (formDataToSubmit) => {
        const userId = localStorage.getItem('userId');
        return {
          url: `/post/${userId}`,
          method: 'POST',
          body: formDataToSubmit,
        };
      },
      invalidatesTags: (result, error, { userId }) => [
        { type: 'Posts', id: 'LIST' },
        { type: 'User', id: 'USER' }, 
      ], 
    }),

    getAllPoets: builder.query({
      query: () => '/post',
      
    }),

    deletePost: builder.mutation({
      query: (id) => {
        return {
          url: `/post/${id}`,
          method:'DELETE'
        };
      },
    }),

  }),
});

export const { useCreatePostMutation, useGetAllPoetsQuery, useDeletePostMutation} = postApi;
