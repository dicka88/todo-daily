import React from 'react';
import { Link } from 'react-router-dom';
import { IoCalendarClear, IoCalendarNumber, IoCalendar } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { selector } from '../redux/slices/todosSlice';
import dayjs from 'dayjs';

export default function Sidebar({ active = "today" }) {
  const today = new Date();
  const yesterday = dayjs(today).subtract(1, 'day').format('YYYY-MM-DD');

  const todoTodayCount = useSelector(selector.getTodos(today)).length;
  const todoYesterdayCount = useSelector(selector.getTodos(yesterday)).length;

  return (
    <div className="bg-grayLight hidden md:block py-8 p-6 w-[250px] h-[calc(100vh-48px)]">
      <Link to="/app">
        <div className={`flex py-2 hover:text-primary transition-colors duration-300 ${active == 'today' ? 'text-primary' : 'text-gray'}`}>
          <IoCalendarClear size={22} className="mr-4" />
          <div className="flex items-center justify-between w-full">
            <span>Today</span>
            <small>{todoTodayCount > 0 ? todoTodayCount : ''}</small>
          </div>
        </div>
      </Link>
      <Link to="/app/yesterday">
        <div className={`flex py-2 hover:text-primary transition-colors duration-300 ${active == 'yesterday' ? 'text-primary' : 'text-gray'}`}>
          <IoCalendar size={22} className="mr-4" />
          <div className="flex items-center justify-between w-full">
            <span>Yesterday</span>
            <small>{todoYesterdayCount ? todoYesterdayCount : ''}</small>
          </div>
        </div>
      </Link>
      <Link to="/app/upcoming">
        <div className={`flex py-2 hover:text-primary transition-colors duration-300 ${active == 'future' ? 'text-primary' : 'text-gray'}`}>
          <IoCalendarNumber size={22} className="mr-4" />
          <div className="flex items-center justify-between w-full">
            <span>Upcoming</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
