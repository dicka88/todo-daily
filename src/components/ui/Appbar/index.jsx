import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "../../../redux/slices/authSlice";
import { selectSync, setSync } from "../../../redux/slices/syncSlice";
import {
  fetchTodos,
  subscribeTodosChange,
} from "../../../redux/slices/todosSlice";
import { selectSidebarOpen, setApp } from "../../../redux/slices/appSlice";

import ProfileDropdown from "./ProfileDropdown";
import { BsList } from "react-icons/bs";

export default function Appbar() {
  const dispatch = useDispatch();

  const isSynced = useSelector(selectSync);
  const sidebarOpen = useSelector(selectSidebarOpen);
  const user = useSelector(selectUser);

  const syncAllData = useCallback(async () => {
    if (!isSynced) {
      dispatch(setApp({ loadingState: true }));
      dispatch(subscribeTodosChange(user.uid));
      await dispatch(fetchTodos(user.uid));
      dispatch(setSync(true));
      dispatch(setApp({ loadingState: false }));
      dispatch(setApp({ loadingState: false }));
    }
  }, [isSynced]);

  useMemo(() => {
    syncAllData();
  }, []);

  return (
    <div className="flex bg-primary py-2 px-6 justify-between h-[48px]">
      <button
        className="mr-4"
        onClick={() => dispatch(setApp({ sidebarOpen: !sidebarOpen }))}
      >
        <BsList color="white" size={30} />
      </button>
      <div className="font-bold">
        <Link to="/app">
          <img className="max-h-[30px]" src="/logo-white.png" alt="" />
        </Link>
      </div>
      <ProfileDropdown />
    </div>
  );
}
