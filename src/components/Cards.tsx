import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface CardProps{
    url:string
}

const Cards:React.FC<CardProps> = ({url}) => {
  const router=useRouter();


  const openFeatures=()=>{
    try{
      router.push(`/${url}`);
    }
    catch(e){
      console.log(e);
    }
  }


  return (
    <div
      onClick={() => openFeatures()}
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
