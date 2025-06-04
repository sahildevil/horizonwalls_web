'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/AuthProvider';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const { login } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to Horizon Walls</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to access your favorite wallpapers
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2" 
            onClick={() => login('google')}
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>
          
          <div className="text-center text-sm">
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/sign-up" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}