'use client';

import { useState } from 'react';

export function LoginButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Sign In</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 text-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginButton;
