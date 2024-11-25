"use client"
import { MutationResult } from '@/interfaces/mutationResult';
import { useRegisterMutation } from '@/redux/slices/userApi';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'


const RegisterForm = () => {
  const router = useRouter();
  const [register, { isLoading, isError }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result: MutationResult = await register(formData);
      if (result.error) {
        // console.error('Failed to register:', result.error.data.message);
        toast.error('Registration failed. Please try again.');
      } else {
        console.log('Registration successful:', result.data);
        toast.success('Registration successful!');
        router.push('/login');
        
      }
    } catch (err) {
      console.error('Failed to register:', err);
      toast.error('Registration failed. Please try again.');
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <ToastContainer />
      <form className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-white mb-6">Register</h2>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-white mb-2">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 rounded"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 rounded"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-white mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 rounded"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
