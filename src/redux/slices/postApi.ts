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
  tagTypes: ['Posts'], // Define tag types for invalidation
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
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }], // Invalidate the Posts list on create
    }),

    getAllPoets: builder.query({
      query: () => '/post',
      
    }),
  }),
});

// Export hooks for usage in functional components
export const { useCreatePostMutation, useGetAllPoetsQuery } = postApi;
