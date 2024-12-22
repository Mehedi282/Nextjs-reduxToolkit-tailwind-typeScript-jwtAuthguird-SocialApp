import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../config';

export const userDetailsApi = createApi({
  reducerPath: 'userDetailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addUserDetails: builder.mutation({
      query: (formDataToSubmit) => {
        const userId = localStorage.getItem('userId');
      
        return {
          url: `/user-details/${userId}`,
          method: 'POST',
          body: formDataToSubmit,
        };
      },
    }),

    editUserDetails: builder.mutation({
        query: (formDataToSubmit) => {
          const userId = localStorage.getItem('userId');
        
          return {
            url: `/user-details/${userId}`,
            method: 'PUT',
            body: formDataToSubmit,
          };
        },
      }),
    
    getUser: builder.query({
      query: () => '/user',
    }),
    
    getUserDetailsById: builder.query({
      query: (id) => {
        const userId = localStorage.getItem('userId');
        return {
          url: `/user-details/${userId}`, 
          method: 'GET',
        };
      },
    }),
  }),
});

// Fixing the typo here
export const { useAddUserDetailsMutation, useGetUserDetailsByIdQuery, useEditUserDetailsMutation } = userDetailsApi;
