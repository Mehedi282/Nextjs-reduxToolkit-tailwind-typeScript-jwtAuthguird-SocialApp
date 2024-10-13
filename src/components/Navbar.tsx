'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsLoggedIn } from '@/redux/slices/isLogedIn';
import { Home } from '@mui/icons-material';
import todayLogo from '../../public/assets/today-logo-73-5813-removebg-preview.png'
import Image from 'next/image';


const Navbar = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const isLoggedIn = useSelector(selectIsLoggedIn);


  // Function to handle logout
  const handleLogout = () => {
    // Clear localStorage or perform any other logout actions
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    dispatch(logout())
    router.push('/'); // Redirect to home page or login page after logout
  };

  const homeRoute = isLoggedIn ? "/home" : "/";


  return (
    <nav className="bg-gray-800 p-4 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <Link href={homeRoute} className="text-white font-bold text-lg">
          <Image src={todayLogo} alt="Today" width={80} height={90} />
          </Link>
        </div>

        {/* Navigation links */}
        {isLoggedIn && (
          <div className="hidden md:block ">
            <Link href="/home" className="text-white ml-4 hover:text-gray-300">
              <span className="material-icons">home</span>
            </Link>
            <Link href="profile" className="text-white ml-4 hover:text-gray-300">
              <span className="material-icons">
                account_circle
              </span>
            </Link>
          </div>
        )}

        {/* Login or Logout button */}
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Hamburger menu for mobile */}
        <div className="block md:hidden">
          {/* Hamburger icon */}
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
