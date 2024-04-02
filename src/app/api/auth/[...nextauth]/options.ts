// import type { NextAuthOptions } from "next-auth";
// import GitHubProvider from 'next-auth/providers/github';
// import CredentialsProviders from "next-auth/providers/credentials";

// export const options:NextAuthOptions={
//     providers:[
//         GitHubProvider({
//             clientId:process.env.GITHUB_ID as string,
//             clientSecret:process.env.GITHUB_SECRET as string
//         }),
//         CredentialsProviders({
//             name:"Credentials",
//             credentials:{
//                 username:{
//                     label:"Username",
//                     type:"text",            //Html type and label and placeholders
//                     placeholder:"Username"
//                 },
//                 password:{
//                     label:"Password",
//                     type:"password",
//                     placeholder:"password"
//                 }
//             },
//             async authorize(credentials){
//                 const user={id:"98",name:"Prateek",password:"123"};


//                 if(credentials?.username===user.name && credentials?.password===user.password){
//                     return user
//                 }
//                 else{
//                     return null
//                 }
//             }
//         })
//     ],
// }



// import type { NextAuthOptions } from 'next-auth'
// import GitHubProvider from 'next-auth/providers/github'
// import CredentialsProvider from 'next-auth/providers/credentials'

// export const options: NextAuthOptions = {
    
//     providers: [
//         GitHubProvider({
//             clientId: process.env.GITHUB_ID as string,
//             clientSecret: process.env.GITHUB_SECRET as string,
//         }),
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 username: {
//                     label: "Username:",
//                     type: "text",
//                     placeholder: "your-cool-username"
//                 },
//                 password: {
//                     label: "Password:",
//                     type: "password",
//                     placeholder: "your-awesome-password"
//                 }
//             },
//             async authorize(credentials) {
//                 // This is where you need to retrieve user data 
//                 // to verify with credentials
//                 // Docs: https://next-auth.js.org/configuration/providers/credentials
//                 const user = { id: "42", name: "Dave", password: "nextauth" }

//                 if (credentials?.username === user.name && credentials?.password === user.password) {
//                     return user
//                 } else {
//                     return null
//                 }
//             }
//         })
//     ],
// }

import NextAuth, { type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/lib/db/mongoose';
import { UserModel } from '@/lib/db/models/User';
import { verifyPassword } from '@/lib/auth/authUtils';

interface CustomUser {
    id: string;
    name: string;
    email: string;
    password: string;
  }
  
  export const options: NextAuthOptions = {
    session: {
      strategy: 'jwt',
      maxAge: 10 * 24 * 60 * 60, // 10 days
    },
    // pages: {
    //     signIn: '/auth/login', // Specify the sign-in page
    // },
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
      }),
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: {
            label: 'Username:',
            type: 'text',
            placeholder: 'your-cool-username',
          },
          password: {
            label: 'Password:',
            type: 'password',
            placeholder: 'your-awesome-password',
          },
        },
        async authorize(credentials) {
            console.log("\n\n\n\n\n\n\n\naskdfads\n\n\n\n\n\n\n")
            await connectToDatabase();

            const { username, password } = credentials as Record<'username' | 'password', string>;
          
            const user = await UserModel.findOne({ email: username });
          
            if (!user) {
              throw new Error('No user found with the email');
            }
          
            const isValid = await verifyPassword(password, user.password);
          
            if (!isValid) {
              throw new Error('Invalid password');
            }
          
            const userData: CustomUser = {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              password: user.password,
            };
          
            return userData;
        },
      }),
    ],
  };