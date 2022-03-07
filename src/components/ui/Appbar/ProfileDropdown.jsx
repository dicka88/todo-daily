import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { BsGearFill, BsPersonFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import OutsideClickHandler from "react-outside-click-handler/build/OutsideClickHandler";

import { persistor } from "../../../redux/store";

import {
  fetchUpdateUser,
  selectPreferences,
  selectUser,
  setLogout,
} from "../../../redux/slices/authSlice";

import { logout } from "../../../services/authService";

export default function ProfileDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const user = useSelector(selectUser);
  const preferences = useSelector(selectPreferences);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleToggleDarkMode = () => {
    dispatch(
      fetchUpdateUser({
        uid: user.uid,
        data: {
          preferences: {
            ...preferences,
            darkMode: !preferences.darkMode,
          },
        },
      })
    );
  };

  const handleLogout = async () => {
    dispatch(setLogout());
    persistor.purge();
    logout();

    navigate("/");
  };

  return (
    <div className="relative">
      <OutsideClickHandler onOutsideClick={() => open && toggleOpen()}>
        <button onClick={toggleOpen}>
          <div className="h-[35px] w-[35px] rounded-full bg-graySoft">
            <img className="rounded-full max-h-[35px]" src={user.photoURL} />
          </div>
        </button>
        <div className="relative">
          <div
            className={`absolute rounded-lg right-0 border top-2 border-graySoft dark:border-zinc-700 shadow-stone-300 dark:shadow-zinc-800 shadow-lg transition-all z-10 duration-400 min-w-[200px] bg-white dark:bg-black dark:text-white ${
              open ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            <div className="flex items-center ro p-4 border-b border-graySoft">
              <div className="mr-4">
                <div className="h-[35px] w-[35px] rounded-full bg-graySoft">
                  <img
                    className="rounded-full max-h-[35px]"
                    src={user.photoURL}
                  />
                </div>
              </div>
              <div className="whitespace-nowrap text-gray dark:text-white overflow-ellipsis">
                <h1>{user.displayName}</h1>
                <small>{user.email}</small>
              </div>
            </div>
            <div
              className="mx-4 my-2 bg-graySoft dark:bg-neutral-700 flex rounded-lg justify-between cursor-pointer relative"
              onClick={handleToggleDarkMode}
            >
              <div
                className={`px-2 w-full py-1 rounded-lg text-center z-[2] ${
                  !preferences.darkMode && "text-white"
                } `}
              >
                {t("light")}
              </div>
              <div
                className={`px-2 w-full py-1 rounded-lg text-center z-[2] ${
                  preferences.darkMode && "text-black"
                }`}
              >
                {t("dark")}
              </div>
              <span
                className={`absolute transition-transform duration-300 bg-black dark:bg-white top-0 bottom-0 w-1/2 rounded-lg ${
                  preferences.darkMode && "translate-x-full"
                }`}
              />
            </div>
            <Link to="/app/profile">
              <div className="px-4 hover:bg-graySoft dark:hover:bg-zinc-700 cursor-pointer py-2 flex items-center">
                <BsPersonFill size={16} className="mr-4 inline" />
                <span>{t("profile")}</span>
              </div>
            </Link>
            <Link to="/app/settings">
              <div className="px-4 hover:bg-graySoft dark:hover:bg-zinc-700 cursor-pointer py-2 flex items-center">
                <BsGearFill size={16} className="mr-4 inline" />
                <span>{t("settings")}</span>
              </div>
            </Link>
            <hr className="border-graySoft" />
            <button className="w-full" onClick={handleLogout}>
              <div className="text-primary px-4 hover:bg-graySoft dark:hover:bg-zinc-700 cursor-pointer py-2 flex items-center">
                <FiLogOut size={16} className="mr-4 inline" />
                <span>{t("logout")}</span>
              </div>
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
}
