import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className='text-center'>
        <img src="/icon.svg" className='mx-auto mb-4' alt="Todo Daily" />
        <span>
          Initializing
        </span>
      </div>
    </div>
  );
}
