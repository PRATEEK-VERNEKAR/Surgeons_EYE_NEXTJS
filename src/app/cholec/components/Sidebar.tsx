// components/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import { useSelectedLayoutSegments,useRouter } from 'next/navigation';


interface Chat {
  dateTimeId: string;
  transcript: string;
  category:string
  conversations: {
    type: string;
    message: string;
  }[];
}

interface SidebarProps {
  userEmail: string;
  // onChatSelect: (dateTimeId: string, chatHistory: Chat) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userEmail }) => {
  const [allIds, setAllIds] = useState<String[]>([]);
  const router=useRouter();


  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`/api/getAllIds/${userEmail}/cholec`);

        const data = await response.json();
        console.log(data)
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

  // const handleChatSelect = (dateTimeId: string, chat: Chat) => {
  //   router.push(`/cataract/${userEmail}/${dateTimeId}`);
  //   // onChatSelect(dateTimeId, chat);
  // };

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Chat Sessions</h2>
      <ul>
        {allIds.map((dateTimeId) => (
          <li
            // key={dateTimeId}
            className="bg-white p-2 rounded-md mb-2 cursor-pointer hover:bg-gray-300"
            // onClick={() => handleChatSelect(chat.dateTimeId, chat)}
            onClick={()=>{router.push(`/cholec/${userEmail}/${dateTimeId}`)}}
          >
            <span className="font-semibold">{dateTimeId}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;