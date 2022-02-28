import React from 'react'

export default function SecondaryButton({ children, ...props }) {
  return (
    <button className='border border-primary text-primary rounded-md p-1 px-4' {...props}>
      {children}
    </button>
  )
}
