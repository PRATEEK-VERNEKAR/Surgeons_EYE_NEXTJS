"use client";

import Cards from "@/app/video_text_qa/components/Cards";
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
    </div>
  );
}
