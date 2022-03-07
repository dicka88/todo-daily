import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Flags from "country-flag-icons/react/3x2";

import Sidebar from "../../components/Sidebar";
import Appbar from "../../components/ui/Appbar";

import {
  fetchUpdateUser,
  selectPreferences,
  selectUser,
} from "../../redux/slices/authSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const user = useSelector(selectUser);
  const preferences = useSelector(selectPreferences);

  const handleToggleLanguage = () => {
    const lang = preferences.language == "id" ? "en" : "id";
    dispatch(
      fetchUpdateUser({
        uid: user.uid,
        data: {
          preferences: {
            ...preferences,
            language: lang,
          },
        },
      })
    );
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <Appbar />
      <div className="flex">
        <Sidebar />
        <div className="container max-w-screen-lg py-8 px-12">
          <h1 className="text-primary font-bold text-[32px] mb-4">
            {t("settings")}
          </h1>
          <hr className="border border-graySoft my-4" />
          <label htmlFor="language-switcher" className="block mb-2 font-bold">
            {t("language")}
          </label>
          <div className="inline-block" id="language-switcher">
            <div
              className="bg-graySoft dark:bg-neutral-700 flex rounded-lg justify-between cursor-pointer relative"
              onClick={handleToggleLanguage}
            >
              <div
                className={`px-10 w-full py-1 rounded-lg text-center z-[2] ${
                  preferences.language == "en" && "text-white dark:text-black"
                } `}
              >
                <Flags.US title="United States" className="h-[24px] p-1" />
              </div>
              <div
                className={`px-10 w-full py-1 rounded-lg text-center z-[2] ${
                  preferences.language == "id" && "text-white dark:text-black"
                }`}
              >
                <Flags.ID title="Indonesian" className="h-[24px] p-1" />
              </div>
              <span
                className={`absolute transition-transform duration-300 bg-black dark:bg-white top-0 bottom-0 w-1/2 rounded-lg ${
                  preferences.language == "id" && "translate-x-full"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
