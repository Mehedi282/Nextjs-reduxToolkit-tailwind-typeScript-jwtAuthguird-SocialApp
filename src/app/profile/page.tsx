'use client'
import AuthGuird from '@/authGuird/authGuird'
import { useGetUserByIdQuery } from '@/redux/slices/userApi';
import React from 'react'

function page() {
  const {data, error, idLoading} = useGetUserByIdQuery();
  console.log(data);
  AuthGuird();
  return (
    <div>profile</div>
  )
}

export default page