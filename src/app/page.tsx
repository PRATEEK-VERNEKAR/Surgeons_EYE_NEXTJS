"use client";

import Cards from "@/components/Cards";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();


  return (
    <div style={{backgroundImage:`url("public/background.png")`}} className="flex flex-col justify-center items-center ">
      <div className="flex justify-center items-center gap-2">
        <Cards url='video_text_qa'/>
        <Cards url='realtime_anomaly_detection'/>
      </div>
    </div>
  );
}
