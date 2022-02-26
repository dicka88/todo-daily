import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='flex justify-between py-5'>
      <Link to="/">
        <img src="/logo.png" alt="" />
      </Link>
      <div className='flex'>
        <Link to={"/signin"} className="text-primary px-4 py-2 border-b-primary hover:border-b-2">
          Login
        </Link>
        {/* <Link to={"/signup"} className=" px-4 py-2 border-b-primary hover:border-b-2">
          Signup
        </Link> */}
      </div>
    </nav>
  );
}
