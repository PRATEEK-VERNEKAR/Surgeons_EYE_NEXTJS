
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongoose';
import {UserModel} from '@/lib/db/models/User'; 

export async function POST(request: Request) {
  try {
    await connectToDatabase(); 

    const { email, msgType, message , dateTimeId,transcript,category} = await request.json();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    console.log(email,msgType,message,dateTimeId,transcript,category);

    // console.log("USERS",user.chats);
    const currentChatObj = user.chats.find(
      (chat) => chat.dateTimeId === dateTimeId
    );

    // console.log("HELLO" , currentChatObj)

    if (currentChatObj) {      
      if (transcript) {
        currentChatObj.transcript = transcript; 
        currentChatObj.conversations.push({ type: msgType, message:transcript });
      }
      else{
        currentChatObj.conversations.push({ type: msgType, message:message });
      }
    } else {
      console.log(message);
      user.chats.push({
        dateTimeId:dateTimeId,
        transcript:transcript,
        category:category,
        // chatName:"",
        conversations: [{ type: msgType, message:"message" }],
      });
    }

    await user.save();

    return NextResponse.json({ message: 'Chat message appended successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export const config = {
  runtime: 'edge',
};