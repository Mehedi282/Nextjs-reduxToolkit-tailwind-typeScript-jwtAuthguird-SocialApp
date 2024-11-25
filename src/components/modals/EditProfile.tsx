'use client'

import { useAddUserDetailsMutation, useGetUserDetailsByIdQuery } from '@/redux/slices/editProfileApi';
import { setSubmissionSuccess } from '@/redux/slices/isSubmitted';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
    location: string;
    job: string;
    education: string;
    image: File | null;
}

export default function ProfileFormModal() {
    const dispatch = useDispatch();
    const { data, isError: isGetUserError, isLoading: isGetUserLoading } = useGetUserDetailsByIdQuery(null);
    const [addUserDetaills, { isLoading: isAddUserLoading, isError: isAddUserError }] = useAddUserDetailsMutation();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        location: "",   
        job: "",
        education: "",
        image: null as File | null
    });

    const toggleModal = () => setIsOpen(!isOpen);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setFormData({ ...formData, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('location', formData.location)
        formDataToSubmit.append('jobDetails', formData.job)
        formDataToSubmit.append('education', formData.education)
        if (formData.image) {
            formDataToSubmit.append('image', formData.image);
        }



        try {
            const result = await addUserDetaills(formDataToSubmit)
            if ('error' in result) {
                console.error('Failed to submit:', result.error);
                toast.error(' Submition failed. Please try again.');
                dispatch(setSubmissionSuccess(true));
            } else {
                console.log('Submition successful:', result.data);
                toast.success('Submition successful!');

            }

        } catch (error) {
            console.error('Failed to submit:', error);
            toast.error('Submition failed. Please try again.');

        }

        setIsOpen(false);
    };

    

    return (
        <>
            <ToastContainer />

            <div className='flex justify-center pt-10'>
                <button onClick={toggleModal} className='bg-gray-900 w-4/12 py-3 rounded-full '>Add Profile Info</button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-95">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Update Profile</h2>
                            <button onClick={toggleModal} className="text-white hover:text-gray-800">&times;</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-white">Upload Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="mt-1 block w-full"
                                />
                                {imagePreview && (
                                    <div className="mt-2 flex justify-center">
                                        <img src={imagePreview} alt="Preview" className="h-40 w-40 object-cover rounded-full" />
                                    </div>
                                )}
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-white">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                                    placeholder="Enter your location"
                                />
                            </div>

                            {/* Job */}
                            <div>
                                <label className="block text-sm font-medium text-white">Job</label>
                                <input
                                    type="text"
                                    name="job"
                                    value={formData.job}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                                    placeholder="Enter your job"
                                />
                            </div>

                            {/* Education */}
                            <div>
                                <label className="block text-sm font-medium text-white">Education</label>
                                <input
                                    type="text"
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                                    placeholder="Enter your education"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
