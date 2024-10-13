// pages/index.tsx

import { useCreatePostMutation } from "@/redux/slices/postApi";
import { useState } from "react";



const PostModal: React.FC = () => {
  const [createPost, { isLoading: isPostLoading, isError: isPostError }] = useCreatePostMutation();

  const [isModalOpen, setModalOpen] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [caption, setCaption] = useState<string>("");

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPhotos(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    const formDataToSubmit = new FormData();
        formDataToSubmit.append('content', caption)
        if (photos) {
          photos.forEach((photo, index) => {
            formDataToSubmit.append(`photos`, photo); 
          });
        }


        try {
          // Await the mutation result and check its status
          const result = await createPost(formDataToSubmit).unwrap(); // Use unwrap() to directly access data or throw an error
          console.log('Submission successful:', result);
        } catch (error) {
          console.error('Failed to submit:', error);
        }

    // Reset the state after upload
    setPhotos([]);
    setCaption("");
    setModalOpen(false);
  };

  // Create an array of image URLs for preview
  const imagePreviews = photos.map((photo) => URL.createObjectURL(photo));

  return (
    <div className="">
      <div className="flex justify-center pt-5">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-gray-900 w-3/12 py-3 rounded-full text-white"
        >
          Create new post
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-80"
            onClick={() => setModalOpen(false)}
          ></div>
          <div className="bg-gray-900 rounded-lg shadow-lg z-10 p-6 max-w-3xl w-full">
            <h2 className="text-xl font-bold mb-4">Upload Photos</h2>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="mb-4 border rounded p-2 w-full"
            />
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Enter caption"
              className="border rounded p-2 w-full h-36 mb-4 text-black"
            />

            {/* Image Previews */}
            <div className="mb-4">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
              ))}
            </div>

            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
            >
              Upload
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-gray-300 text-gray-700 rounded py-2 px-4 ml-2 hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostModal;
