'use client'
import AuthGuird from '@/authGuird/authGuird'
import { User } from '@/interfaces/user';
import { useGetUserQuery } from '@/redux/slices/userApi';
import React from 'react';



function Page() {
  AuthGuird();
  const { data: users, error, isLoading } = useGetUserQuery(null);
  

  if(isLoading){
    return(
      <div className='text-center, p-10'>
        Loading.....
      </div>
    )
  }
  
  return (
    <div className='h-screen flex flex-row justify-start'>
    <div className='w-4/12 bg-slate-500'>
    {
      users.map((userInfo:User)=>{
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
    <div className='w-8/12 bg-zinc-500'>
      news feed
    </div>
    </div>
  )
}

export default Page