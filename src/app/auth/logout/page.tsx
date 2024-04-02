'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    const result = await signOut({ redirect: true, callbackUrl: '/' });

    // if (result.url) {
    // } else {
    //   console.error('Error during sign-out:');
    // }

    console.log(result)
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}