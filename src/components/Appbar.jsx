import React, { useState } from 'react';
import { BsArchive, BsFillTrashFill } from 'react-icons/bs';
import OutsideClickHandler from 'react-outside-click-handler/build/OutsideClickHandler';
import { Link } from 'react-router-dom';
import { BsPersonFill, BsGearFill } from 'react-icons/bs';

export default function Appbar() {
  const [dropdownProfileOpen, setDropdownProfileOpen] = useState(false);

  return (
    <div className="flex bg-primary py-2 px-6 justify-between h-[48px]">
      <div className="font-bold">
        <Link to="/app">
          <img className="max-h-[30px]" src="/logo-white.png" alt="" />
        </Link>
      </div>
      <div className='relative'>
        <OutsideClickHandler
          onOutsideClick={() => dropdownProfileOpen && setDropdownProfileOpen(false)}
        >
          <button onClick={() => setDropdownProfileOpen(!dropdownProfileOpen)}>
            <img className="rounded-full max-h-[35px]" src="https://i.pravatar.cc/150?img=37" alt="Avatar" />
          </button>
          <div className="relative">
            <div className={`absolute rounded-md right-0 border border-graySoft transition-all duration-400 min-w-[170px] bg-white ${dropdownProfileOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
              <div className="flex items-center p-4 border-b border-graySoft">
                <div className="mr-4">
                  <img className="rounded-full max-h-[35px]" src="https://i.pravatar.cc/150?img=37" alt="" />
                </div>
                <div className="whitespace-nowrap text-gray overflow-ellipsis">
                  Dicka Ismaji
                </div>
              </div>
              <div className='px-4 hover:bg-graySoft cursor-pointer py-2 flex items-center'>
                <BsPersonFill size={16} className="mr-4 inline" />
                <span>Profile</span>
              </div>
              <div className='px-4 hover:bg-graySoft cursor-pointer py-2 flex items-center'>
                <BsGearFill size={16} className="mr-4 inline" />
                <span>Setting</span>
              </div>
              <hr className='border-graySoft' />
              <Link to="/">
                <button className="w-full">
                  <div className='text-primary px-4 hover:bg-graySoft cursor-pointer py-2 flex items-center'>
                    <BsFillTrashFill size={16} className="mr-4 inline" />
                    <span>Logout</span>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
}
