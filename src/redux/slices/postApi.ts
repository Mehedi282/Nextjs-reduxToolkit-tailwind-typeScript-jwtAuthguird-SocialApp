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
  tagTypes: ['Posts', 'User'],
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (formDataToSubmit) => {
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error("User ID is missing from localStorage.");
        return {
          url: `/post/${userId}`,
          method: 'POST',
          body: formDataToSubmit,
        };
      },
      invalidatesTags: (result, error, { userId }) => [
        { type: 'Posts', id: 'LIST' },
        { type: 'User', id: userId },
      ],
    }),

    uploadVideo: builder.mutation({
      query: (formDataToSubmit) => {
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error("User ID is missing from localStorage.");
        return {
          url: `/post/uploadVideo/${userId}`,
          method: 'POST',
          body: formDataToSubmit,
        };
      },
    }),

    getAllPoets: builder.query({
      query: () => '/post',
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPoetsQuery,
  useDeletePostMutation,
  useUploadVideoMutation,
} = postApi;
