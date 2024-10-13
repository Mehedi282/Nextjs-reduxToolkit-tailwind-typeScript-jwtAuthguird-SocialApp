'use client'
import { useLoginMutation } from '@/redux/slices/userApi';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import {doLogin} from '@/redux/slices/isLogedIn';
import { MutationResult } from '@/interfaces/mutationResult';


const LoginPage = () => {
    const dispatch = useDispatch();
    const [login, { isLoading, isError }] = useLoginMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e:any) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e:any) => {
        setPassword(e.target.value);
    };

    const router = useRouter();

    const handleLogin = async (e:any) => {
        e.preventDefault();
        const loginData = {
            email: email,
            password: password
        }

        console.log(loginData);

        try {
            const result: MutationResult = await login(loginData);
            if (result.error) {
                console.error('Failed to Login:', result);
                toast.error('Login failed. Please try again.');
              } else {
                console.log('Registration successful:', result.data);
                toast.success('Login successful!');
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('userId', result.data.userId);
                dispatch(doLogin());
                router.push('/home');
              }
        } catch (error) {
            console.error('Server error:', error);
            toast.error('Login failed. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <ToastContainer />
            <div className="w-full max-w-md">
                <form className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name='email'
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
