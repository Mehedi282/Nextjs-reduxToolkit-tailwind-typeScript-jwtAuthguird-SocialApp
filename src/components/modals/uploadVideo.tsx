import { setSubmissionSuccess } from "@/redux/slices/isSubmitted";
import { useUploadVideoMutation } from "@/redux/slices/postApi";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const UploadVideo: React.FC = () => {
  const dispatch = useDispatch();
  const [uploadVideo, { isLoading: isPostLoading, isError: isPostError }] = useUploadVideoMutation();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // Clean up video preview URL on component unmount or video change
  useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setVideo(selectedFile);
      setVideoPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!video) {
      alert("Please select a video to upload.");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("video", video);

    console.log("Submitting FormData:", Array.from(formDataToSubmit.entries()));

    try {
      const result = await uploadVideo(formDataToSubmit).unwrap();
      console.log("Submission successful:", result);

      // Reset state after successful upload
      setVideo(null);
      setVideoPreview(null);
      setModalOpen(false);
    } catch (error: any) {
      console.error("Failed to submit:", error);

      // Dispatch error state
      dispatch(setSubmissionSuccess(false));

      if (error?.data?.message) {
        console.error("Server error message:", error.data.message);
      } else {
        console.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center pt-3">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-gray-900 w-5/12 py-3 rounded-full text-white"
        >
          Upload New Video
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-80"
            onClick={() => setModalOpen(false)}
          ></div>
          <div className="bg-gray-900 rounded-lg shadow-lg z-10 p-6 max-w-3xl w-full">
            <h2 className="text-xl font-bold mb-4">Upload Video</h2>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="mb-4 border rounded p-2 w-full"
            />

            {/* Video Preview */}
            {videoPreview && (
              <div className="mb-4">
                <video
                  controls
                  className="w-full h-48 object-cover rounded"
                  src={videoPreview}
                ></video>
              </div>
            )}

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              className={`rounded py-2 px-4 ${
                isPostLoading
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={isPostLoading}
            >
              {isPostLoading ? "Uploading..." : "Upload"}
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-gray-300 text-gray-700 rounded py-2 px-4 ml-2 hover:bg-gray-400"
            >
              Cancel
            </button>

            {/* Error Message */}
            {isPostError && (
              <div className="text-red-500 mt-4">
                An error occurred while uploading. Please try again.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
