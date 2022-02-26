import React from 'react';
import { useSelector } from 'react-redux';
import Appbar from '../../components/Appbar';
import { selectUser } from '../../redux/slices/authSlice';

export default function Profile() {
  const user = useSelector(selectUser);
  console.log(user);

  return (
    <>
      <Appbar />
      <div className="container py-8">
        <div className='mb-6'>
          <div className="rounded-full mx-auto h-[100px] w-[100px] bg-graySoft border border-graySoft overflow-hidden">
            <img src={user.photoURL} alt="" className="object-fit w-full h-full" />
          </div>
          <div className="text-center my-4">
            <h1 className="font-bold text-lg text-[1.7rem]">{user.displayName}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
