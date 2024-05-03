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

//   const generateDateTimeId=()=>{
//     const now = new Date();
//     const year = now.getFullYear().toString();
//     const month = (now.getMonth() + 1).toString().padStart(2, '0');
//     const day = now.getDate().toString().padStart(2, '0');
//     const hours = now.getHours().toString().padStart(2, '0');
//     const minutes = now.getMinutes().toString().padStart(2, '0');
//     const seconds = now.getSeconds().toString().padStart(2, '0');

//     const combinedId = `${year}${month}${day}${hours}${minutes}${seconds}`;
//     return combinedId
//   }

  const openRealTime=()=>{
    try{
      router.push(`realtime_anomaly_detection/${url}/`)
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <div
      onClick={() => openRealTime()}
      className="group w-full  border border-4 border-limme-500 rounded-lg shadow-lg bg-gradient-to-r from-pink-500 via-orange-500 to-red-100 rounded-lg shadow-lg overflow-hidden m-4 cursor-pointer w-[500px]"
    >
      <Image
        className="rounded-t-lg object-cover w-full h-[300px] group-hover:scale-105 transition duration-300 ease-in-out"
        src={"/" + url + ".jpg"}
        height={200} width={200}
        alt=""
      />
      <div className="text-center py-6 w-full flex flex-col justify-between">
        <p
          className="text-2xl text-black font-bold pb-2 uppercase group-hover:text-indigo-900 transition duration-300 ease-in-out"
        >
          {url}
        </p>
      </div>
    </div>
  )
}

export default Cards;
