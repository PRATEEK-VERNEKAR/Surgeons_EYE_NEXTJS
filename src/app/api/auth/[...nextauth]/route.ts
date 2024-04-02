import NextAuth, { type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import TwitterProvider from 'next-auth/providers/twitter';
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

const options: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 24*60 * 60, // 10 days
  },
  pages: {
    signIn: '/auth/login', // Specify the sign-in page
    signOut: '/auth/logout',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: '2.0', // opt-in to Twitter OAuth 2.0
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'email:',
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
        await connectToDatabase();
        const { email, password } = credentials as Record<'email' | 'password', string>;
        const user = await UserModel.findOne({ email: email });

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

const handler = NextAuth(options);

export { handler as GET, handler as POST };