import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { SiGithub } from 'react-icons/si';
import { useDispatch } from 'react-redux';

import { setUser } from '../redux/slices/authSlice';

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(result => {
      const { uid, displayName, photoURL, email } = result.user;

      const user = {
        uid,
        displayName,
        email,
        photoURL,
        isLogged: true
      };

      dispatch(setUser(user));
      navigate('/app');
    }).catch(err => {
      console.log(err);
    });
  };

  const handleGithubSignin = () => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider).then(result => {
      const user = { ...result.user, isLogged: true };

      dispatch(setUser(user));
      navigate('/app');
    });
  };

  return (
    <div className="bg-grayLight h-[100vh]">
      <div className="md:py-24">
        <div className="mx-auto max-w-[512px] h-screen md:h-auto bg-white border border-graySoft p-8">
          <div className="mb-6">
            <Link to="/">
              <img src="/logo.png" alt="Todo Daily" className='max-h-[30px]' />
            </Link>
          </div>
          <h1 className="font-bold text-[24px] mb-6">Signin</h1>
          <div className='mb-2'>
            <div className="text-center mb-4 text-gray">
              Easy login with one tap
            </div>
            <button className="border w-full block border-graySoft rounded p-2 mb-2 transition-colors duration-300 hover:border-graySoft hover:bg-grayLight" onClick={handleGoogleSignin}>
              <FcGoogle className='inline mr-4' size={24} />
              <span>
                Continue using Google
              </span>
            </button>
            {/* <button className="border w-full block border-graySoft rounded p-2 mb-2 transition-colors duration-300 hover:border-primary" onClick={handleGithubSignin}>
              <SiGithub className='inline mr-4' size={24} />
              <span>
                Continue using Github
              </span>
            </button> */}
          </div>
          <hr className="border-graySoft mt-12 mb-4" />
          <div className="text-center">
            {/* Not have an account ? <Link to="/signup" className="text-primary">Signup</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
