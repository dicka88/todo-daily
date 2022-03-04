import React, { useCallback, useEffect, useMemo, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler/build/OutsideClickHandler";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonFill, BsGearFill, BsList } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setLogout } from "../redux/slices/authSlice";
import { selectSync, setSync } from "../redux/slices/syncSlice";
import { fetchTodos, subscribeTodosChange } from "../redux/slices/todosSlice";
import {
  selectPreferences,
  selectSidebarOpen,
  setApp,
} from "../redux/slices/appSlice";
import { persistor } from "../redux/store";
import { useTranslation } from "react-i18next";

export default function Appbar() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownProfileOpen, setDropdownProfileOpen] = useState(false);

  const isSynced = useSelector(selectSync);
  const sidebarOpen = useSelector(selectSidebarOpen);
  const user = useSelector(selectUser);
  const darkMode = useSelector(selectPreferences).darkMode;
  const language = useSelector(selectPreferences).language;

  console.log(language);

  const handleLogout = async () => {
    dispatch(setLogout());
    persistor.purge();
    logout();

    navigate("/");
  };

  const handleToggleDarkMode = () => {
    dispatch(
      setApp({
        preferences: {
          darkMode: !darkMode,
        },
      })
    );
  };

  const handleToggleLanguage = () => {
    const lang = language == "id" ? "en" : "id";
    dispatch(
      setApp({
        preferences: {
          language: lang,
        },
      })
    );
    i18n.changeLanguage(lang);
  };

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

  useEffect(() => {
    // set dark mode on / off
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
      <div className="relative">
        <OutsideClickHandler
          onOutsideClick={() =>
            dropdownProfileOpen && setDropdownProfileOpen(false)
          }
        >
          <button onClick={() => setDropdownProfileOpen(!dropdownProfileOpen)}>
            <div className="h-[35px] w-[35px] rounded-full bg-graySoft">
              <img className="rounded-full max-h-[35px]" src={user.photoURL} />
            </div>
          </button>
          <div className="relative">
            <div
              className={`absolute rounded-lg right-0 border top-2 border-graySoft dark:border-zinc-700 shadow-stone-300 dark:shadow-zinc-800 shadow-lg transition-all z-10 duration-400 min-w-[200px] bg-white dark:bg-black dark:text-white ${
                dropdownProfileOpen
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              }`}
            >
              <div className="flex items-center p-4 border-b border-graySoft">
                <div className="mr-4">
                  <img
                    className="rounded-full max-h-[35px]"
                    src={user.photoURL}
                    alt={user.displayName}
                  />
                </div>
                <div className="whitespace-nowrap text-gray dark:text-white overflow-ellipsis">
                  <h1>{user.displayName}</h1>
                  <small>{user.email}</small>
                </div>
              </div>
              <div
                className="mx-4 my-2 bg-graySoft dark:bg-neutral-700 flex rounded-lg justify-between cursor-pointer relative"
                onClick={handleToggleLanguage}
              >
                <div
                  className={`px-2 w-full py-1 rounded-lg text-center z-[2] ${
                    language == "en" && "text-white"
                  } `}
                >
                  EN
                </div>
                <div
                  className={`px-2 w-full py-1 rounded-lg text-center z-[2] ${
                    language == "id" && "text-white"
                  }`}
                >
                  ID
                </div>
                <span
                  className={`absolute transition-transform duration-300 bg-black dark:bg-white top-0 bottom-0 w-1/2 rounded-lg ${
                    language == "id" && "translate-x-full"
                  }`}
                />
              </div>
              <div
                className="mx-4 my-2 bg-graySoft dark:bg-neutral-700 flex rounded-lg justify-between cursor-pointer relative"
                onClick={handleToggleDarkMode}
              >
                <div
                  className={`px-2 w-full py-1 rounded-lg text-center z-[2] ${
                    !darkMode && "text-white"
                  } `}
                >
                  {t("light")}
                </div>
                <div
                  className={`px-2 w-full py-1 rounded-lg text-center z-[2] ${
                    darkMode && "text-black"
                  }`}
                >
                  {t("dark")}
                </div>
                <span
                  className={`absolute transition-transform duration-300 bg-black dark:bg-white top-0 bottom-0 w-1/2 rounded-lg ${
                    darkMode && "translate-x-full"
                  }`}
                />
              </div>
              <Link to="/app/profile">
                <div className="px-4 hover:bg-graySoft cursor-pointer py-2 flex items-center">
                  <BsPersonFill size={16} className="mr-4 inline" />
                  <span>{t("profile")}</span>
                </div>
              </Link>
              <Link to="/app/setting">
                <div className="px-4 hover:bg-graySoft cursor-pointer py-2 flex items-center">
                  <BsGearFill size={16} className="mr-4 inline" />
                  <span>{t("settings")}</span>
                </div>
              </Link>
              <hr className="border-graySoft" />
              <button className="w-full" onClick={handleLogout}>
                <div className="text-primary px-4 hover:bg-graySoft cursor-pointer py-2 flex items-center">
                  <FiLogOut size={16} className="mr-4 inline" />
                  <span>{t("logout")}</span>
                </div>
              </button>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
}
