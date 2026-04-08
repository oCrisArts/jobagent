'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export function AuthModal({ isOpen = true, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/dashboard',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Google
          </button>
          <button
            onClick={() => signIn('linkedin', { callbackUrl: '/dashboard' })}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            LinkedIn
          </button>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="mt-4 w-full text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
