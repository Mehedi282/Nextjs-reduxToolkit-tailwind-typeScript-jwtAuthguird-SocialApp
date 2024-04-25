'use client'
import AuthGuird from '@/authGuird/authGuird'
import { Post } from '@/interfaces/user';
import { useGetUserByIdQuery } from '@/redux/slices/userApi';
import React from 'react';

function Page() {
  const { data, error, isLoading } = useGetUserByIdQuery(null);
  AuthGuird();

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  const userDetails = data?.userDetails; 
  const likes = data?.likes || [];
  const posts = data?.posts || [];

  return (
    <div className='px-20 h-screen pt-5 flex flex-row bg-gray-900 text-white gap-5' >
      <div className='w-5/12 flex flex-col gap-5 bg-gray-800 rounded-xl pt-2'>
        <div className='flex flex-col items-center w-full gap-2'>
          <img className='h-80 w-fit rounded-full ' src={userDetails?.profilePicture} alt="Profile" />
          <p className='font-serif font-bold text-4xl'>{userDetails?.fullName}</p>
        </div>
        <div className='flex flex-col gap-3 mx-5'>
          <div className='flex flex-row gap-2'>
            <span className="material-icons">location_on</span>
            <p className='font-serif font-bold'> Lives in {userDetails?.location}</p>
          </div>
          <div className='flex flex-row gap-2'>
            <span className="material-icons">work</span>
            <p className='font-serif font-bold'>Works as {userDetails?.jobDetails}</p>
          </div>
          <div className='flex flex-row gap-2'>
            <span className="material-icons">school</span>
            <p className='font-serif font-bold'>Studied at {userDetails?.education}</p>
          </div>
        </div>
      </div>

      <div className='w-7/12 bg-gray-800 px-5 pt-2 rounded-xl overflow-hidden overflow-y-auto no-scrollbar '>
        <div>create post</div>
        <div>
          {posts.map((postData: Post) => (
            <div key={postData.id} className="my-4 p-4  bg-gray-700 rounded-md ">
              {/* Display user information */}
              <div className="flex items-center mb-4">
                <img src={userDetails?.profilePicture} className="w-10 h-10 rounded-full mr-2" alt="Profile" />
                <p className="font-bold">{userDetails?.fullName}</p>
              </div>
              {/* Display post content if available */}
              {postData.content && <p className="my-2">{postData.content} </p>}
              {/* Display post images if available */}
              {postData.photos && JSON.parse(postData.photos).length > 0 && (
                <div className="flex flex-wrap">
                  {JSON.parse(postData.photos).map((photo: string, index: number) => (
                    <img key={index} src={photo} className="w-fit h-72 mr-5 mb-2 rounded-md" alt={`Post Image ${index}`} />
                  ))}
                </div>
              )}
              {/* Display post like count */}
              {postData.likes && postData.likes.length > 0 ? (
                <div className="mt-2 flex flex-row items-center gap-2">
                  <span className="material-icons text-red-800">favorite</span>
                  <span>{postData.likes.length}</span>
                </div>
              ) : (
                <div className="mt-2 flex flex-row items-center gap-2">
                  <span className="material-icons text-white">favorite</span>
                  <span className='text-xs'>No react yet!</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
