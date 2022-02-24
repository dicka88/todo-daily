import React from 'react';

export default function PrimaryButton({ children, className, ...props }) {
  return (
    <button className={`bg-primary px-6 py-2 text-white rounded-md font-bold transition-colors duration-150 hover:bg-primaryDark ${className}`} {...props}>
      {children}
    </button>
  );
}
