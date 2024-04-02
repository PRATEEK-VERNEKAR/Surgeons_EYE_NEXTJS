'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: true,
      email,
      password,
      callbackUrl,
    });
    console.log(result);
    if (result?.error) {
      console.error('Error logging in:', result.error);
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300 shadow-md"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Or sign in with:</p>
          <div className="flex justify-center space-x-4 mt-2">
            <button
              onClick={() => signIn('github')}
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300 shadow-md"
            >
              GitHub
            </button>
            <button
              onClick={() => signIn('google')}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors duration-300 shadow-md"
            >
              Google
            </button>
            <button
              onClick={() => signIn('twitter')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition-colors duration-300 shadow-md"
            >
              Twitter
            </button>
            <button
              onClick={() => signIn('facebook')}
              className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md"
            >
              Facebook
            </button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a
              href="/auth/register"
              className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}