import React from 'react';
import { Link } from 'react-router-dom';
import { IoCalendarClear, IoCalendarNumber, IoCalendar } from 'react-icons/io5';

export default function Sidebar({ active = "today" }) {

  return (
    <div className="bg-grayLight hidden md:block py-8 p-6 w-[250px] h-[100vh]">
      <Link to="/app">
        <div className={`flex py-2 hover:text-primary transition-colors duration-300 ${active == 'today' ? 'text-primary' : 'text-gray'}`}>
          <IoCalendarClear size={22} className="mr-4" />
          <span>Today</span>
        </div>
      </Link>
      <Link to="/app/yesterday">
        <div className={`flex py-2 hover:text-primary transition-colors duration-300 ${active == 'yesterday' ? 'text-primary' : 'text-gray'}`}>
          <IoCalendar size={22} className="mr-4" />
          <span>Yesterday</span>
        </div>
      </Link>
      <Link to="/app/upcoming">
        <div className={`flex py-2 hover:text-primary transition-colors duration-300 ${active == 'future' ? 'text-primary' : 'text-gray'}`}>
          <IoCalendarNumber size={22} className="mr-4" />
          <span>Future</span>
        </div>
      </Link>
    </div>
  );
}
