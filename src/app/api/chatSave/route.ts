
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


    const currentChatObj = user.chats.find(
      (chat) => chat.dateTimeId === dateTimeId
    );

    if (currentChatObj) {
      currentChatObj.conversations.push({ type: msgType, message });
    } else {
      user.chats.push({
        dateTimeId:dateTimeId,
        transcript:transcript,
        category:category,
        conversations: [{ type: msgType, message }],
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