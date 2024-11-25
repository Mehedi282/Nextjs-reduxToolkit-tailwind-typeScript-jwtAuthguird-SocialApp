import ListIcon from '@mui/icons-material/List';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSubmissionSuccess } from "@/redux/slices/isSubmitted";
import { useDeletePostMutation } from '@/redux/slices/postApi';

type DeletePostModalProps = {
    postId: number |null;  // Define the postId prop
  };

const DeletePostDropdown: React.FC<DeletePostModalProps> = ({postId}) => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [deletePost, { isLoading: deleteLoading }] = useDeletePostMutation();

  // Handle post deletion (customize the function as needed)
  const handleDelete = async (postId:Number|null) => {
    try {
        await deletePost(postId);
        dispatch(setSubmissionSuccess(true)); 
        setDropdownOpen(false)
    } catch (error) {
        console.error('Error deleting notice:', error);
    }



    
  };

  return (
    <div className="relative group">
      {/* Icon Button */}
      <button
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        className="flex items-center"
      >
        <ListIcon />
      </button>

      {/* Dropdown menu */}
      <div className={`absolute right-0  w-48 bg-slate-500 text-white rounded-lg shadow-lg group-hover:block ${isDropdownOpen ? 'block' : 'hidden'}`}>
        <ul className="py-2">
          <li className="px-4 py-2 text-white  hover:bg-slate-600 cursor-pointer">
            Edit Post
          </li>
          <li 
          onClick={()=>handleDelete(postId)}
          className="px-4 py-2 text-white hover:bg-slate-600 cursor-pointer">
            Delete Post
          </li>
          <li
            className="px-4 py-2 text-white hover:bg-slate-600 cursor-pointer"
          >
            Report Post
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DeletePostDropdown;
