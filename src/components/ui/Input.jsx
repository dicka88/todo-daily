import React from "react";

export default function Input({ id, ...props }) {
  return (
    <input
      type="text"
      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-zinc-700 bg-clip-padding border border-solid border-graySoft dark:border-zinc-500 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      {...props}
    />
  );
}
