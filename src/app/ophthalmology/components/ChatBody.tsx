"use client";

import { useSession } from 'next-auth/react';
import React, { useState, useEffect,useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';
import '@/app/ophthalmology/index.css';
import { appendChatMessage } from '@/app/ophthalmology/functions/appendChatMessage';
import { simulateResponse } from '@/app/ophthalmology/functions/simulateResponse';
import { processVideo } from '@/app/ophthalmology/functions/processVideo';
import { predictVideoText } from '@/app/ophthalmology/functions/predictVideoText';
import Sidebar from '@/app/ophthalmology/components/Sidebar';
import { redirect,useRouter } from 'next/navigation';


interface Message {
  type: 'user' | 'system';
  message?: string;
  videoSource?: string;
}

interface Chat {
  dateTimeId: string;
  transcript: string;
  conversations: {
    type: string;
    message: string;
  }[];
}

interface PageProps{
    email:string,
    dateTimeId:string
}



const ChatBody: React.FC<PageProps> = (props:PageProps) => {
  const router=useRouter();
  const { data: session } = useSession({
    required:true,
    onUnauthenticated(){
      router.push("/auth/login")
    }
  });


  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Message[]>([{message:"Hello how can I help you",type:"system"}]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [dateTimeId, setDateTimeId] = useState<string>(props.dateTimeId as string);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!userInput && !videoFile) return;

    setIsLoading(true);

    const newMessages: Message[] = [];


    if (videoFile) {
      const videoData = await processVideo(videoFile);
      const resTranscript = await predictVideoText(videoFile);
      console.log(resTranscript);
      setTranscript(resTranscript);
      await appendChatMessage(session?.user?.email ?? "", "user", "Video Input", dateTimeId, "",'cataract');
      newMessages.push({ type: 'user', message: 'Sent a video', videoSource: videoData }, { type: 'system', message: resTranscript });
      await appendChatMessage(session?.user?.email ?? "", "system", resTranscript, dateTimeId, resTranscript,'cataract');
    } else if (userInput) {
      await appendChatMessage(session?.user?.email ?? "", "user", userInput, dateTimeId, "",'cataract');
      const response = await simulateResponse(userInput, transcript);
      newMessages.push({ type: 'user', message: userInput }, { type: 'system', message: response });
      await appendChatMessage(session?.user?.email ?? "", "system", response, dateTimeId, " ",'cataract');
    }

    setChatHistory((prevChatHistory) => [...prevChatHistory, ...newMessages]);
    setUserInput('');
    setVideoFile(null);
    setIsLoading(false);
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0]);
    }
  };

  // let isSpeaking = false; // Flag to track ongoing speech

  function handleSpeakClick(textToSpeak: string) {
    if (typeof window !== 'undefined' && window.speechSynthesis) {

      // if(isSpeaking){
      //   speechSynthesis.cancel();
      // }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      
      console.log("Speaking");
      console.log(textToSpeak)
      setIsSpeaking(true); // Set speaking flag
      speechSynthesis.speak(utterance);
      utterance.onend=()=>{
        setIsSpeaking(false);
      }

  
      // Customize voice, rate, pitch, etc. if desired
      // utterance.voice = window.speechSynthesis.getVoices()[4]; // Example voice selection
      // utterance.rate = 0.85;
  
    } else {
      console.error('Text-to-speech not supported in this browser.');
    }
  }

  function splitAndSpeak(textToSpeak: string, chunkSize: number = 150) {
    const chunks = textToSpeak.match(/(.{1,150})/g); // Split into 150-character chunks (adjust chunkSize as needed)
    if (chunks) {
      for (const chunk of chunks) {
        handleSpeakClick(chunk);
      }
    } else {
      console.error('Error splitting text into chunks.');
    }
  }
  
  
  
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`/api/chatHistory?email=${props.email}&dateTimeId=${props.dateTimeId}`);
        const data = await response.json();
        if (response.ok) {
          const conversationsHistory: Message[] = data.currentChats.conversations.map(
            (conversation: { type: string; message: string }) => ({
              type: conversation.type === 'user' ? 'user' : 'system',
              message: conversation.message,
            })
          );
          (conversationsHistory)
          setChatHistory(conversationsHistory);
          console.log(data);
          setTranscript(data.currentChats.transcript);
        } else {
          console.error('Error fetching chat history:', data.error);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    if (props.email && props.dateTimeId) {
      fetchChatHistory();
    }
  }, [props.email, props.dateTimeId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);


  const handleChatSelect = (dateTimeId: string, selectedChat: Chat) => {
    const conversationsHistory: Message[] = selectedChat.conversations.map(
      (conversation) => ({
        type: conversation.type === 'user' ? 'user' : 'system',
        message: conversation.message,
      })
    );
    setChatHistory(conversationsHistory);
  };

  return (
    <div className='flex w-full '>
      <div className="flex flex-col h-[800px] w-[100%] mx-2 rounded-xl bg-gray-200">
      <h1 className='text-center text-4xl p-2 rounded-xl w-full bg-red-200'>CATARACT</h1>
        <div 
        className="flex-grow overflow-y-scroll px-4 py-2"
        ref={chatContainerRef}
        style={{
          backgroundImage: `url('/Screenshot from 2024-04-07 18-16-09.png')`,
          backgroundSize: "cover", /* Resize image to cover the container */
          backgroundRepeat: "no-repeat", /* Don't repeat the image */
          backgroundPosition: "center",
          // opacity:0.2
          // filter: "blur(2px)", /* Apply a slight blur effect (optional) */
          /* Add more styles as needed */
        }}
        >
          
        {/* <div className="flex-grow overflow-y-scroll px-4 py-2"> */}
          {chatHistory.map((message, index) => {
            // console.log(message.message);
            return (
              <div
              key={index}
              className={`message rounded-lg p-2 mb-2 ${
                message.type === 'user' ? 'bg-gray-300 text-right' : 'bg-gray-100 text-left'
              }`}
              >
                {message.videoSource && (
                  <>
                    <video src={message.videoSource} controls />
                    {/* {message.message && (
                      <>
                        {String(message.message).split('\n').map((line, lineIndex) => {
                          console.log("|HEIOJEJFKLJF|n\n\n\n")
                          return (
                            <>
                              <p key={lineIndex}>{line}</p>
                              <br />
                            </>
                          );
                        })}
                      </>
                    )} */}
                  </>
                )}
                {message.message && (
                  <div className=''>
                    {String(message.message).split('\n').map((line, lineIndex) => {
                      return (
                        <>
                          <li key={lineIndex}>{line}</li>
                          {/* <br /> */}
                        </>
                      );
                    })}
                    <button onClick={()=>{splitAndSpeak(String(message.message))}}>
                      {
                        isSpeaking?(
                          <Image src='/volume-off-solid.svg' width={10} height={10} alt='Speak Icon'/>
                        ):
                        (    
                          <Image src='/volume-high-solid.svg'  width={20} height={20} alt='Speak Icon'/>
                        )
                      }
                    </button>
                  </div>
                )                
                }
              </div>
            );
          })}
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
    </div>
  );
};

export default ChatBody;