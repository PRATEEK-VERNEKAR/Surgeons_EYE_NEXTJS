// components/Sidebar.tsx

"use client";

import React, { useState, useEffect ,useRef} from 'react';
import { useSelectedLayoutSegments, useRouter } from 'next/navigation';
import Image from 'next/image';

interface Chat {
  dateTimeId: string;
  transcript: string;
  conversations: {
    type: string;
    message: string;
  }[];
}

interface SidebarProps {
  userEmail: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userEmail }) => {
  const [allIds, setAllIds] = useState<String[]>([]);
  const router = useRouter();

  const buttonRef = useRef(null); // Create a reference to the button element
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`/api/getAllIds/${userEmail}/cataract`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setAllIds(data.dateTimeIds);
        } else {
          console.error('Error fetching chats:', data.error);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [userEmail]);

  return (
    <div className="bg-slate-600 p-6 rounded-xl shadow-lg w-80 h-[800px] overflow-y-auto bg-opacity-80">

      <h2 className="text-xl font-bold mb-6 text-yellow-300 uppercase text-center">Chat Sessions</h2>
      <button
        ref={buttonRef} // Assign the reference to the button
        onClick={() => router.push("/video_text_qa/ophthalmology")}
        className='w-full text-center flex justify-center align-center mb-3'
        onMouseEnter={handleMouseEnter} // Add mouseEnter event handler
        onMouseLeave={handleMouseLeave} // Add mouseLeave event handler
      >
      <Image src='/plus-solid.svg' width={40} height={40} alt='plus' className=' border border-4 rounded-full' />
      {isHovered && ( // Conditionally render the hover box
        <div
          className="hover-box absolute top-full left-full mt-2 ml-2 px-3 py-2 rounded-md bg-gray-200 shadow-md border border-gray-400 text-sm" // Customizable hover box styles
        >
          New Session
        </div>
      )}
    </button>
      <ul>
        {allIds.map((dateTimeId,index) => (
          <li
            key={dateTimeId.toString()}
            className="bg-white p-4 rounded-lg mb-4 cursor-pointer hover:bg-indigo-200 transition-colors duration-300 border-2 border-indigo-200"
            onClick={() => {
              router.push(`/video_text_qa/ophthalmology/${userEmail}/${dateTimeId}`);
            }}
          >
            <span className="font-semibold text-gray-800">{index+1}</span>
            <br></br>
            <span className="text-sm text-gray-800">{dateTimeId}</span>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;