"use client";

import Cards from "@/components/Cards";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();


  return (
    <div style={{backgroundImage:`url("public/background.png")`}} className="flex flex-col justify-center items-center ">
      <div className="flex justify-center items-center gap-2">
        <Cards url='ophthalmology'/>
        <Cards url='cholecystectomy'/>
        <Cards url='hysterectomy'/>

      </div>
      <button onClick={()=>{router.push('/cataract')}} type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Get Assistance</button>
    </div>
  );
}
