// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/db/mongoose';
// import { UserModel, IUser } from '@/lib/db/models/User';

// export async function GET(request: Request, { params }: { params: { email: string ,category:string} }) {
//   try {
//     // Connect to the database
//     await connectToDatabase();

//     console.log(params,'\n\n')

//     const users = await UserModel.find({ 
//       email: params.email, 
//       chats: { 
//         $elemMatch: { category: params.category } 
//       } 
//     });

//     console.log("HELLO")
//     console.log(users[0].chats)

//     if (!users) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     const dateTimeIds = users[0].chats.map((chat) => chat.dateTimeId);

//     return NextResponse.json({ dateTimeIds });
//   } catch (error) {
//     console.error('Error fetching dateTimeIds:', error);
//     return NextResponse.json({ error: 'Failed to fetch dateTimeIds' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongoose';
import { UserModel, IUser } from '@/lib/db/models/User';

export async function GET(request: Request, { params }: { params: { email: string, category: string } }) {
  try {
    await connectToDatabase();

    const { email, category } = params;

    console.log("HELLO -> ",email," -> ",category)

    const users = await UserModel.find({
      email,
    });

    

    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log(users)
    const dateTimeIds = users.flatMap(user =>
      user.chats
        .filter(chat => chat.category === category)
        .map(chat => chat.dateTimeId)
    );

    console.log(dateTimeIds)
    return NextResponse.json({ dateTimeIds });
  } catch (error) {
    console.error('Error fetching dateTimeIds:', error);
    return NextResponse.json({ error: 'Failed to fetch dateTimeIds' }, { status: 500 });
  }
}
