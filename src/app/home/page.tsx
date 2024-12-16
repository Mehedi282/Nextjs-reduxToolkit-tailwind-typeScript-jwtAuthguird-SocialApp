'use client';
import AuthGuird from '@/authGuird/authGuird';
import { Post } from '@/interfaces/user';
import { resetSubmissionSuccess, selectSubmissionSuccess } from '@/redux/slices/isSubmitted';
import { useGetAllPoetsQuery } from '@/redux/slices/postApi';
import { useGetUserQuery } from '@/redux/slices/userApi';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Page() {
  AuthGuird();
  const [id, setId] = useState<string | null>(null);
  const [comments, setComments] = useState<{ [postId: number]: string }>({}); // To store new comments locally

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setId(userId);
  }, []);

  const { data: allUsers, isLoading } = useGetUserQuery(null);
  const { data: postsData, isError, isLoading: getpostLoading, refetch } = useGetAllPoetsQuery(null);

  const submissionSuccess = useSelector(selectSubmissionSuccess);
  const dispatch = useDispatch();

  useEffect(() => {
    if (submissionSuccess) {
      refetch();
      dispatch(resetSubmissionSuccess());
    }
  }, [submissionSuccess, refetch, dispatch]);

  let posts: Post[] = [];
  if (!isError && !getpostLoading && postsData) {
    posts = [...postsData].sort((a, b) => b.id - a.id);
  }

  const handleCommentChange = (postId: number, comment: string) => {
    setComments({ ...comments, [postId]: comment });
  };

  const handleCommentSubmit = (postId: number) => {
    const comment = comments[postId]?.trim();
    if (!comment) return;

    // Call API or Redux action to submit the comment
    console.log(`Submitting comment for post ${postId}:`, comment);

    // Clear the comment input field for the post
    setComments({ ...comments, [postId]: '' });
  };

  if (isLoading) {
    return (
      <div className="text-center p-10">
        Loading.....
      </div>
    );
  }

  return (
    <div className="h-screen flex justify-center bg-gray-900 text-white">
      <div className="w-full px-5 pt-5 overflow-hidden overflow-y-auto no-scrollbar">
        <div className="mx-auto w-1/2">
          {posts?.map((postData: Post) => (
            <div key={postData.id} className="m-4 p-10 pt-5 bg-gray-800 rounded-lg">
              {/* User Information */}
              <div className="flex items-center mb-4">
                <img
                  src={postData?.user?.userDetails?.profilePicture}
                  className="w-10 h-10 rounded-full mr-2"
                  alt="Profile"
                />
                <p className="font-bold">{postData?.user?.fullName}</p>
              </div>
              {/* Post Content */}
              {postData.content && <p className="my-2">{postData.content}</p>}
              {/* Video */}
              {postData.video && (
                <div className="flex justify-center my-4">
                  <video className="rounded-2xl" controls width="400" height="450">
                    <source src={postData.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              {/* Images */}
              {postData.photos && JSON.parse(postData.photos).length > 0 && (
                <div className="flex flex-wrap">
                  {JSON.parse(postData.photos).map((photo: string, index: number) => (
                    <img
                      key={index}
                      src={photo}
                      className="w-fit h-72 mr-5 mb-2 rounded-md"
                      alt={`Post Image ${index}`}
                    />
                  ))}
                </div>
              )}
              {/* Likes */}
              {postData.likes && postData.likes.length > 0 ? (
                <div className="mt-2 flex items-center gap-2">
                  <span className="material-icons text-red-800">favorite</span>
                  <span>{postData.likes.length}</span>
                </div>
              ) : (
                <div className="mt-2 flex items-center gap-2">
                  <span className="material-icons text-white">favorite</span>
                  <span className="text-xs">No reacts yet!</span>
                </div>
              )}
              {/* Comment Section */}
              <div className="mt-4">
                <div className=''>
                  <textarea
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    placeholder="Write a comment..."
                    value={comments[postData.id] || ''}
                    onChange={(e) => handleCommentChange(postData.id, e.target.value)}
                  />
                  <button
                    className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                    onClick={() => handleCommentSubmit(postData.id)}
                  >
                    Add Comment
                  </button>
                </div>
                {/* Display Existing Comments */}
                {postData.comments.map((comment, index) => (
                  <div  key={index} className="mb-2 mt-5">
                    <p className="text-sm text-gray-400">{comment.user.fullName}:</p>
                    <p>{comment.comment}</p>
                  </div>
                ))}

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
