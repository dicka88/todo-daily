import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  IoCalendarClear,
  IoCalendarNumber,
  IoCalendar,
  IoCloseOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { selector } from "../redux/slices/todosSlice";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import { selectSidebarOpen, setApp } from "../redux/slices/appSlice";
import AboutAppModal from "./modals/AboutAppModal";

export default function Sidebar({ active = "today" }) {
  const { t } = useTranslation();

  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  const dispatch = useDispatch();
  const sidebarOpen = useSelector(selectSidebarOpen);

  const today = dayjs().format("YYYY-MM-DD");
  const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");

  const todoTodayCount = useSelector(selector.getTodos(today)).length;
  const todoYesterdayCount = useSelector(selector.getTodos(yesterday)).length;

  // Responsive
  const isMobile = useMediaQuery({ maxWidth: 768 }, null);
  const isDesktop = useMediaQuery({ minWidth: 768 }, null);

  useEffect(() => {
    if (isMobile) {
      dispatch(setApp({ sidebarOpen: false }));
    }

    if (isDesktop) {
      dispatch(setApp({ sidebarOpen: true }));
    }
  }, [isMobile, isDesktop]);

  return (
    <>
      <div
        className={`w-full h-full md:visible top-0 ${sidebarOpen ? "md:w-auto" : "w-0 invisible"
          } transition-transform duration-300 fixed md:static z-10 bg-black md:bg-transparent bg-opacity-60`}
        onClick={() => dispatch(setApp({ sidebarOpen: false }))}
      />
      <div
        className={`relative bg-grayLight dark:bg-[#242424] left-0 top-0 md:top-[48px] ${sidebarOpen ? "" : "-translate-x-full invisible w-0"
          } fixed md:static z-10 transition-all duration-300 py-4 md:py-8 p-6 w-[250px] h-full md:h-[calc(100vh-48px)]`}
      >
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => dispatch(setApp({ sidebarOpen: false }))}>
            <IoCloseOutline size={24} />
          </button>
        </div>
        <Link to="/app">
          <div
            className={`flex py-2 hover:text-primary transition-colors duration-300 ${active == "today" ? "text-primary" : "text-gray dark:text-white"
              }`}
          >
            <IoCalendarClear size={22} className="mr-4" />
            <div className="flex items-center justify-between w-full">
              <span>{t("menuToday")}</span>
              <small>{todoTodayCount > 0 ? todoTodayCount : ""}</small>
            </div>
          </div>
        </Link>
        <Link to="/app/yesterday">
          <div
            className={`flex py-2 hover:text-primary transition-colors duration-300 ${active == "yesterday"
              ? "text-primary"
              : "text-gray dark:text-white"
              }`}
          >
            <IoCalendar size={22} className="mr-4" />
            <div className="flex items-center justify-between w-full">
              <span>{t("menuYesterday")}</span>
              <small>{todoYesterdayCount ? todoYesterdayCount : ""}</small>
            </div>
          </div>
        </Link>
        <Link to="/app/upcoming">
          <div
            className={`flex py-2 hover:text-primary transition-colors duration-300 ${active == "future" ? "text-primary" : "text-gray dark:text-white"
              }`}
          >
            <IoCalendarNumber size={22} className="mr-4" />
            <div className="flex items-center justify-between w-full">
              <span>{t("menuUpcoming")}</span>
            </div>
          </div>
        </Link>
        <div className="absolute bottom-0 p-4">
          <button className="text-primary" onClick={() => setAboutModalOpen(true)}>
            About
          </button>
          <AboutAppModal open={aboutModalOpen} setIsOpen={setAboutModalOpen} />
        </div>
      </div>
    </>
  );
}
