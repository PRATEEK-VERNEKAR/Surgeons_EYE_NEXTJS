import '@/app/video_text_qa/hysterectomy/index.css';
import Sidebar from '@/app/video_text_qa/hysterectomy/components/Sidebar';
import ChatBody from '@/app/video_text_qa/hysterectomy/components/ChatBody';
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth/next"
import {options} from "@/app/api/auth/[...nextauth]/route"


interface PageProps{
  params:{  
    email:string,
    dateTimeId:string
  }
}

const Chatbot: React.FC<PageProps> = async ({params}) => {

  const session=await getServerSession(options);

  console.log(session)
  console.log("\n\n\n\n")
  if(!session){
    redirect(`/auth/login?callbackUrl=/video_text_qa/hysterectomy`)
  }

  return (
    // <div className='flex' style={{backgroundImage: `url('public/eye_background.png')`} }>
    <div
      className="flex"
    >
      <Sidebar userEmail={params.email ?? ""} />
      <ChatBody email={params.email} dateTimeId={params.dateTimeId}/>
    </div>
  );
};

export default Chatbot;