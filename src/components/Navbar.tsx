"use client";

import React, { useState ,useEffect} from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router=useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const generateDateTimeId=()=>{
    const now = new Date();
    const year = now.getFullYear().toString();  
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const combinedId = `${year}${month}${day}${hours}${minutes}${seconds}`;
    return combinedId
  }

  const openChatbots=(surgery:string)=>{
    try{
      // if(session?.user?.email){
        router.push(`/${surgery}/${session?.user?.email}/${generateDateTimeId()}`)
      // }
    }
    catch(e){
      console.log(e);
    }
  }


  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 w-[100%]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/welcome"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Surgeons EYE
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className={`block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:p-0 ${
                  pathname === '/'
                    ? 'text-white  md:text-blue-700'
                    : 'text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/welcome"
                className={`block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:p-0 ${
                  pathname === '/welcome'
                    ? 'text-white  md:text-blue-700'
                    : 'text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }`}
              >
                Help
              </Link>
            </li>
            <li>
              <button
                onClick={()=>{openChatbots('cataract')}}
                className={`block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:p-0 ${
                  pathname === '/cataract/'
                    ? 'text-white  md:text-blue-700'
                    : 'text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }`}
              >
                Cataract
              </button>
            </li>
            <li>
              <button
                onClick={()=>{openChatbots('cholec')}}
                className={`block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:p-0 ${
                  pathname === '/cholec/'
                    ? 'text-white  md:text-blue-700'
                    : 'text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }`}
              >
                Cholec
              </button>
            </li>
            {session?.user ? (
            <li>
              <Link
                href="/api/auth/signout"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Sign Out
              </Link>
            </li>
          ) : (
            <li>
              <Link
                href="/auth/login"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Sign In
              </Link>
            </li>
          )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;