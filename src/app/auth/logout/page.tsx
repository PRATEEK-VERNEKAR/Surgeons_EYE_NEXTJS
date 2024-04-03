'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SignOut() {
  const router = useRouter();
  const { data: session } = useSession();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (session) {
      setShowConfirmation(true);
    }
  }, [session]);

  const handleSignOut = async () => {
    const result = await signOut({ redirect: false, callbackUrl: '/' });
    if (result.url) {
      router.push(result.url);
    } else {
      console.error('Error during sign-out:');
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center">
      {showConfirmation ? (
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Confirm Sign Out</h2>
          <p className="mb-6">Are you sure you want to sign out?</p>
          <div className="flex justify-end">
            <button
              onClick={handleCancel}
              className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}