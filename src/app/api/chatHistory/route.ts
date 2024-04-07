import { connectToDatabase } from '@/lib/db/mongoose';
import { UserModel,IUser } from '@/lib/db/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
        await connectToDatabase();
        
        const { searchParams } = new URL(request.url);

        const email = searchParams.get('email');
        const dateTimeId=searchParams.get('dateTimeId');
        // const category
        
      
        if (!email || !dateTimeId) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }
        
        const user:IUser|null = await UserModel.findOne({ email },{chats:{$elemMatch:{dateTimeId}}});
        // const user = await UserModel.findOne({ email });
        

        console.log("adfkljaklfdjasdfj\n\n\n")
        // console.log(user);


        if (!user) {
            return NextResponse.json({ chats: [] }, { status: 404 });
        }

        const chat = user.chats.find((c) => c.dateTimeId === dateTimeId);
        console.log(chat)
        
        return NextResponse.json({"currentChats":chat});
    }
    catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}