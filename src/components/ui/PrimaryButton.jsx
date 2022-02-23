import React from 'react';

export default function PrimaryButton({ children, ...props }) {
  return (
    <button className="bg-primary px-6 py-2 text-white rounded-md font-bold text-[1.5rem] transition-colors duration-150 hover:bg-primaryDark" {...props}>
      {children}
    </button>
  );
}
