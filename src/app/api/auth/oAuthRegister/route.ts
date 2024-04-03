import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongoose';
import { hashPassword } from '@/lib/auth/authUtils';
import { UserModel } from '@/lib/db/models/User';

interface UserData {
  name: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const { name, email }: UserData = await request.json();

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }


    const newUser = new UserModel({
      name,
      email,
    });

    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
  }
}