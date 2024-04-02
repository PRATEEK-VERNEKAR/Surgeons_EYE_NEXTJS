"use client";
import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './index.css'; 

interface Message {
  type: 'user' | 'system';
  message?: string;
  videoSource?: string;
  apiResponse?: string;
}

const Chatbot: React.FC = () => {
  const { data: session } = useSession();
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [transcript,setTranscript]=useState<string>("");
  const [dateTimeId,setDateTimeId]=useState<string | null>(null)

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };


  
  async function appendChatMessage(email: string, msgType: string, message: string,transcript:string): Promise<boolean> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, msgType, message,dateTimeId,transcript }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        return true;
      } else {
        console.error('Failed to append chat message');
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }


  const handleSendMessage = async () => {
    if (!userInput && !videoFile) return;

    setIsLoading(true);

    const newMessages: Message[] = [];

    console.log(session?.user?.email);

    if (videoFile) {
      const videoData = await processVideo(videoFile);
      const apiResponse = await sendVideoToAPI(videoFile);
      await appendChatMessage(session?.user?.email ??  "","user","Video Input","");
      setTranscript(apiResponse);
      newMessages.push({ type: 'user', message: 'Sent a video', videoSource: videoData}, { type: 'system', message: apiResponse } );
      await appendChatMessage(session?.user?.email ??  "","system",apiResponse,transcript);
    }

    else if (userInput) {
      await appendChatMessage(session?.user?.email ??  "","user",userInput,"");
      const response = await simulateResponse(userInput);
      newMessages.push({ type: 'user', message: userInput }, { type: 'system', message: response });
      await appendChatMessage(session?.user?.email ??  "","system",response,transcript);
    }

    setChatHistory((prevChatHistory) => [...prevChatHistory, ...newMessages]);
    setUserInput('');
    setVideoFile(null);
    setIsLoading(false);
  };

  const simulateResponse = async (text: string): Promise<string> => {
    console.log(text)

    text=transcript+'\n\n'+text;
    console.log(text)
    // const temp="Incision Phase: 0 - 91 seconds\n    * Tools Used: Bonn Forceps, Hydro Cannula\n    * Eye parts detected: Cornea, Iris\n    Viscous agent injection Phase: 92 - 102 seconds\n    * Tools Used: Hydro Cannula\n    * Eye parts detected: Cornea, Iris\n    Rhexis Phase: 103 - 124 seconds\n    * Tools Used: Cap Cystotome\n    * Eye parts detected: Cornea, Iris\n    Hydrodissection Phase: 125 - 156 seconds\n    * Tools Used: Primary Knife\n    * Eye parts detected: Cornea, Iris\n    Phacoemulsificiation Phase: 157 - 231 seconds\n    * Tools Used: Phaco Handpiece\n    * Eye parts detected: Cornea, Lens fragments\n    Irrigation and aspiration Phase: 232 - 271 seconds\n    * Tools Used: A/I Handpiece\n    * Eye parts detected: Cornea, Capsule\n    Capsule polishing Phase: 272 - 283 seconds\n    * Tools Used: Visco Cannula\n    * Eye parts detected: Cornea, Capsule\n    Viscous agent injection Phase: 284 - 299 seconds\n    * Tools Used: Lens Injector\n    * Eye parts detected: Cornea, Iris\n    Lens implant setting-up Phase: 300 - 322 seconds\n    * Tools Used: Rycroft Cannula, A/I Handpiece\n    * Eye parts detected: Cornea, Lens implant\n    Viscous agent removal Phase: 323 - 354 seconds\n    * Tools Used: Visco Cannula\n    * Eye parts detected: Cornea, Lens implant\n    Tonifying and antibiotics Phase: 355 - 379 seconds\n    * Tools Used: Visco Cannula\n    * Eye parts detected: Cornea, Lens implant\n    What is happening in 10th second"
    const requestBody = {
      prompt:text,
      chat_history:[],
    };

    try {
      const response = await fetch('http://localhost:5000/answer_question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log(response)

      const data = await response.json();
      console.log(data)
      return data.response;

    } catch (error) {
      console.error('Error simulating response:', error);
      return 'Error simulating response';
    }
  };



  const processVideo = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read video file'));
      };
      reader.readAsDataURL(file);
    });
  };

  const sendVideoToAPI = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('video', file);

    console.log(formData)

    try {
      // return "Incision Phase: 0 - 91 seconds\n    * Tools Used: Bonn Forceps, Hydro Cannula\n    * Eye parts detected: Cornea, Iris\n    Viscous agent injection Phase: 92 - 102 seconds\n    * Tools Used: Hydro Cannula\n    * Eye parts detected: Cornea, Iris\n    Rhexis Phase: 103 - 124 seconds\n    * Tools Used: Cap Cystotome\n    * Eye parts detected: Cornea, Iris\n    Hydrodissection Phase: 125 - 156 seconds\n    * Tools Used: Primary Knife\n    * Eye parts detected: Cornea, Iris\n    Phacoemulsificiation Phase: 157 - 231 seconds\n    * Tools Used: Phaco Handpiece\n    * Eye parts detected: Cornea, Lens fragments\n    Irrigation and aspiration Phase: 232 - 271 seconds\n    * Tools Used: A/I Handpiece\n    * Eye parts detected: Cornea, Capsule\n    Capsule polishing Phase: 272 - 283 seconds\n    * Tools Used: Visco Cannula\n    * Eye parts detected: Cornea, Capsule\n    Viscous agent injection Phase: 284 - 299 seconds\n    * Tools Used: Lens Injector\n    * Eye parts detected: Cornea, Iris\n    Lens implant setting-up Phase: 300 - 322 seconds\n    * Tools Used: Rycroft Cannula, A/I Handpiece\n    * Eye parts detected: Cornea, Lens implant\n    Viscous agent removal Phase: 323 - 354 seconds\n    * Tools Used: Visco Cannula\n    * Eye parts detected: Cornea, Lens implant\n    Tonifying and antibiotics Phase: 355 - 379 seconds\n    * Tools Used: Visco Cannula\n    * Eye parts detected: Cornea, Lens implant\n"
      const response = await fetch('http://127.0.0.1:8000/process_video', {
        method: 'POST',
        body: formData,
      });
      const videoOutputdata = await response.json();
      console.log(videoOutputdata)
      return videoOutputdata.message;
    } catch (error) {
      console.error('Error sending video to API:', error);
      return 'Error processing video';
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const combinedId = `${year}${month}${day}${hours}${minutes}${seconds}`;
    setDateTimeId(combinedId);
    setChatHistory([{ type: 'system', message: 'Hey this is your surgeon! How can I help you today?' }]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);


  return (
    <div className="flex flex-col h-[800px] w-[50%] m-auto rounded-xl bg-gray-200">
      {/* <div className="flex-grow overflow-y-scroll px-4 py-2" ref={chatContainerRef}>
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`message rounded-lg p-2 mb-2 ${
              message.type === 'user' ? 'bg-gray-300 text-left' : 'bg-gray-100 text-right'
            }`}
          >
            {message.videoSource && (
              <>
                <video src={message.videoSource} controls />
                <p>{message.apiResponse}</p>
              </>
            )}
            {message.message && <p>{message.message}</p>}
          </div>
        ))}
        {isLoading && <div className="text-center mt-4">Loading...</div>}
      </div> */}

<div className="flex-grow overflow-y-scroll px-4 py-2" ref={chatContainerRef}>
  {chatHistory.map((message, index) => (
    <div
      key={index}
      className={`message rounded-lg p-2 mb-2 ${
        message.type === 'user' ? 'bg-gray-300 text-left' : 'bg-gray-100 text-right'
      }`}
    >
      {message.videoSource && (
        <>
          <video src={message.videoSource} controls />
          {message.apiResponse && (
            <>
              {String(message.apiResponse).split('*').map((line, lineIndex) => {(
                <>
                  <p key={lineIndex}>{line}</p>
                  <br/>
                </>
              )})}
            </>
          )}
        </>
      )}
      {message.message && <p>{message.message}</p>}
    </div>
  ))}
  {isLoading && <div className="text-center mt-4">Loading...</div>}
</div>


      <div className="flex items-center px-4 py-2 border-t border-gray-300 bg-white rounded-b-xl shadow-md">
        {videoFile && (
          <div className="flex items-center mb-2">
            <svg
              className="h-5 w-5 text-green-500 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700">
              Selected video: {videoFile.name}
            </span>
          </div>
        )}
        <div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden">
          <div className={`relative flex-grow mr-2 ${videoFile ? 'ring-2 ring-green-500' : ''}`}>
            <input
              type="text"
              value={userInput}
              onChange={handleUserInput}
              placeholder="Type your message..."
              className={`w-full p-2 rounded-lg ${videoFile ? 'border-green-500' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-blue-500 ${videoFile ? 'bg-green-100' : ''}`}
              disabled={videoFile ? false : false}
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              {videoFile ? (
                <svg
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm3.464-1.95a8 8 0 10-8.928 0A1.45 1.45 0 0110 3v1A8.008 8.008 0 0112.536 2.05z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="video-upload"
              className="ml-2 p-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold cursor-pointer transition duration-200 hover:bg-gradient-to-l hover:from-blue-500 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="12" cy="12" r="3" />
                <line x1="12" y1="19" x2="12" y2="12" />
              </svg>
            </label>
            <input
              type="file"
              id="video-upload"
              accept="video/mp4,video/x-m4v,video/*"
              onChange={handleVideoChange}
              className="hidden"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold cursor-pointer transition duration-200 hover:bg-gradient-to-l hover:from-purple-600 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;