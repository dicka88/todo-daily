import React, { useCallback, useEffect, useMemo, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler/build/OutsideClickHandler';
import { Link, useNavigate } from 'react-router-dom';
import { BsPersonFill, BsGearFill, BsList } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '../services/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setLogout } from '../redux/slices/authSlice';
import { selectSync, setSync } from '../redux/slices/syncSlice';
import { fetchTodos } from '../redux/slices/todosSlice';
import { selectSidebarOpen, setApp } from '../redux/slices/appSlice';

export default function Appbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownProfileOpen, setDropdownProfileOpen] = useState(false);
  const isSynced = useSelector(selectSync);

  const sidebarOpen = useSelector(selectSidebarOpen);

  const user = useSelector(selectUser);

  const handleLogout = async () => {
    dispatch(setLogout());
    navigate('/');
    await logout();
  };

  const syncAllData = useCallback(async () => {
    if (!isSynced) {
      dispatch(setApp({ loadingState: true }));
      await dispatch(fetchTodos(user.uid));
      dispatch(setSync(true));
      dispatch(setApp({ loadingState: false }));
      dispatch(setApp({ loadingState: false }));
    }
  }, [isSynced]);

  useMemo(() => {
    syncAllData();
  }, []);

  useEffect(() => {
  }, []);

  return (
    <div className="flex bg-primary py-2 px-6 justify-between h-[48px]">
      <button className='mr-4' onClick={() => dispatch(setApp({ sidebarOpen: !sidebarOpen }))}>
        <BsList color='white' size={30} />
      </button>
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
            <div className="h-[35px] w-[35px] rounded-full bg-graySoft">
              <img className="rounded-full max-h-[35px]" src={user.photoURL} />
            </div>
          </button>
          <div className="relative">
            <div className={`absolute rounded-md right-0 border border-graySoft transition-all z-10 duration-400 min-w-[170px] bg-white ${dropdownProfileOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
              <div className="flex items-center p-4 border-b border-graySoft">
                <div className="mr-4">
                  <img className="rounded-full max-h-[35px]" src={user.photoURL} alt={user.displayName} />
                </div>
                <div className="whitespace-nowrap text-gray overflow-ellipsis">
                  {user.displayName}
                </div>
              </div>
              <Link to="/app/profile">
                <div className='px-4 hover:bg-graySoft cursor-pointer py-2 flex items-center'>
                  <BsPersonFill size={16} className="mr-4 inline" />
                  <span>Profile</span>
                </div>
              </Link>
              <Link to="/app/setting">
                <div className='px-4 hover:bg-graySoft cursor-pointer py-2 flex items-center'>
                  <BsGearFill size={16} className="mr-4 inline" />
                  <span>Setting</span>
                </div>
              </Link>
              <hr className='border-graySoft' />
              <button className="w-full" onClick={handleLogout}>
                <div className='text-primary px-4 hover:bg-graySoft cursor-pointer py-2 flex items-center'>
                  <FiLogOut size={16} className="mr-4 inline" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
}
