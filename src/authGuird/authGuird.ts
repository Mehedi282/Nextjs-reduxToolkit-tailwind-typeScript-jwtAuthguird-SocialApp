'use client'
import { selectIsLoggedIn } from '@/redux/slices/isLogedIn'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function AuthGuird() {
    const isLogedIn = useSelector(selectIsLoggedIn);
    const router = useRouter();

    useEffect(()=>{
        if(isLogedIn ==false){
            router.push('/')
        }
    },[isLogedIn, router])

  return isLogedIn
}

export default AuthGuird