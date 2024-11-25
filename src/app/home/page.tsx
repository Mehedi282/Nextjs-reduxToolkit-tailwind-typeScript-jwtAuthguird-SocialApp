'use client'
import AuthGuird from '@/authGuird/authGuird'
import { Post, User } from '@/interfaces/user';
import { resetSubmissionSuccess, selectSubmissionSuccess } from '@/redux/slices/isSubmitted';
import { useGetAllPoetsQuery } from '@/redux/slices/postApi';
import { useGetUserQuery } from '@/redux/slices/userApi';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



function Page() {
  AuthGuird();
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setId(userId);
  }, []);


  const { data: allUsers, error, isLoading } = useGetUserQuery(null);
  const { data: postsData, isError, isLoading: getpostLoading, refetch } = useGetAllPoetsQuery(null);

  const submissionSuccess = useSelector(selectSubmissionSuccess);
  const dispatch = useDispatch();

  useEffect(() => {
    if (submissionSuccess) {
      refetch();
      dispatch(resetSubmissionSuccess()); 
    }
  }, [submissionSuccess, refetch, dispatch]);

 let users =[];
 if (allUsers && id) {
  users = [...allUsers].filter(x => x.id !== parseInt(id, 10));
}


  let posts =[]

if (!isError && !getpostLoading && postsData) {
  posts = [...postsData].sort((a, b) => b.id - a.id);
}




  if (isLoading) {
    return (
      <div className='text-center, p-10'>
        Loading.....
      </div>
    )
  }

  return (
    <div className='h-screen flex flex-row justify-center text-white'>
      <div className='w-5/12 bg-gray-900 pl-60 '>
      <div className='flex justify-center pt-5'>

        <h1>Other Users</h1>
        </div>
        {
          users.map((userInfo: User) => {
            return (
              <>
                <div className='flex gap-5 p-3 '>
                  <div><img src={userInfo?.userDetails?.profilePicture || 'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Background-PNG-Clip-Art.png'} className="w-20 h-20 rounded-full mr-2" alt="Profile" /></div>
                  <div><div className=' py-2  gap-2'>
                    <div className='font-extrabold'>{userInfo.fullName}</div>
                    <div>{userInfo?.userDetails?.location}</div>
                  </div></div>
                </div>
              </>
            )
          })
        }

      </div>
      <div className='w-full bg-gray-900 px-5 pt-5  pr-60 overflow-hidden overflow-y-auto no-scrollbar '>
        <div>
          {posts?.map((postData: Post) => (
            <div key={postData.id} className="my-4  mt-0 p-10 pt-5 bg-gray-800 rounded-lg ">
              {/* Display user information */}
              <div className="flex items-center mb-4">
                <img src={postData?.user?.userDetails?.profilePicture} className="w-10 h-10 rounded-full mr-2" alt="Profile" />
                <p className="font-bold">{postData?.user?.fullName}</p>
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