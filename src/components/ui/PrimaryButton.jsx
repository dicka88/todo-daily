import React from 'react';

export default function PrimaryButton({ children, className, ...props }) {
  return (
    <button className={`bg-primary px-6 py-2 text-white rounded-md transition-colors duration-150 hover:bg-primaryDark disabled:bg-red-400 ${className}`} {...props}>
      {children}
    </button>
  );
}
