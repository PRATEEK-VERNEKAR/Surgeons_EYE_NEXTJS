import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface CardProps{
    url:string
}

const Cards:React.FC<CardProps> = ({url}) => {
  const router=useRouter();
  const {data:session}=useSession();

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

  const openChatbot=()=>{
    try{
      router.push(`/${url}/${session?.user?.email}/${generateDateTimeId()}`)
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <div onClick={() => {openChatbot()}} className="bg-slate-300 max-w-sm bg-white border border-gray-200 rounded-lg shadow m-4 cursor-pointer h-[400px] w-[600px]">
        <Image className="rounded-t-lg object-cover w-[600px] h-[300px]" src={"/"+url+".jpg"}  height={200} width={200} alt="" />
        <p className='p-2 text-2xl text-center font-bold uppercase'>{url}</p>
        <div className='text-center'>
            <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Explore Assistant</button>
        </div>
    </div>
    )
}

export default Cards;
