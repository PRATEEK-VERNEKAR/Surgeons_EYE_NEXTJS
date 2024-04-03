// components/Sidebar.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { useSelectedLayoutSegments, useRouter } from 'next/navigation';

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
    <div className="bg-gray-100 p-6 rounded-xl shadow-lg w-80">
      <h2 className="text-xl font-bold mb-6 text-indigo-800">Chat Sessions</h2>
      <ul>
        {allIds.map((dateTimeId) => (
          <li
            key={dateTimeId.toString()}
            className="bg-white p-4 rounded-lg mb-4 cursor-pointer hover:bg-indigo-200 transition-colors duration-300 border-2 border-indigo-200"
            onClick={() => {
              router.push(`/cataract/${userEmail}/${dateTimeId}`);
            }}
          >
            <span className="font-semibold text-gray-800">{dateTimeId}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;