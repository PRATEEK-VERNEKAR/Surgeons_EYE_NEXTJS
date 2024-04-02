import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongoose';
import { UserModel, IUser } from '@/lib/db/models/User';

export async function GET(request: Request, { params }: { params: { email: string } }) {
  try {
    // Connect to the database
    await connectToDatabase();

    console.log(params)

    // Find the user with the matching email
    const user = await UserModel.findOne({ email: params.email }, { 'chats.dateTimeId': 1, _id: 0 });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Extract dateTimeId values from the chats array
    const dateTimeIds = user.chats.map((chat) => chat.dateTimeId);

    return NextResponse.json({ dateTimeIds });
  } catch (error) {
    console.error('Error fetching dateTimeIds:', error);
    return NextResponse.json({ error: 'Failed to fetch dateTimeIds' }, { status: 500 });
  }
}