import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { SiGithub } from 'react-icons/si';

export default function Signup() {
  return (
    <div className="bg-grayLight h-[100vh]">
      <div className="py-24">
        <div className="mx-auto max-w-[512px] bg-white border border-graySoft p-8">
          <div className="mb-6">
            <Link to="/">
              <img src="/logo.png" alt="" />
            </Link>
          </div>
          <h1 className="font-bold text-[24px] mb-6">Signup</h1>
          <div className='mb-2'>
            <button className="border w-full block border-graySoft rounded p-2 mb-2">
              <FcGoogle className='inline mr-4' size={24} />
              <span>
                Continue using Google
              </span>
            </button>
            <button className="border w-full block border-graySoft rounded p-2">
              <SiGithub className='inline mr-4' size={24} />
              <span>
                Continue using Github
              </span>
            </button>
          </div>
          <hr className="border-graySoft mt-12 mb-4" />
          <div className="text-center">
            Not have an account ? <Link to="/signin" className="text-primary">Signin</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
