import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setApp } from '../redux/slices/appSlice';

export default function LoadingScreen() {
  const dispatch = useDispatch();
  const LOADING_TIMEOUT = 10 * 1000;

  useEffect(() => {
    // Loading screen timeout
    setTimeout(() => {
      dispatch(setApp({ loadingState: false }));
    }, LOADING_TIMEOUT);
  }, []);

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
