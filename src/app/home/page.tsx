'use client'
import AuthGuird from '@/authGuird/authGuird'
import { useGetUserQuery } from '@/redux/slices/userApi';
import React from 'react'

function page() {
  AuthGuird();
  const {data, error, isLoading} =  useGetUserQuery();
  if(error){
    return (
      <div className='text-center, p-10'>s
       Error: {error.messsae}
      </div>
    )
  }

  if(isLoading){
    return(
      <div className='text-center, p-10'>
        Loading.....
      </div>
    )
  }
  
  return (
    <div className='h-screen flex flex-row justify-start'>
    <div className='w-4/12'>
    {
      data.map((userInfo)=>{
       return (
        <>
        <div>
          {userInfo.fullName}
        </div>
        </>
       )
      })
    }
    </div>
    <div className='w-8/12'>
      news feed
    </div>
    </div>
  )
}

export default page