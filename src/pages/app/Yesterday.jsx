import dayjs from 'dayjs';
import React from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";
import Appbar from "../../components/Appbar";

import Sidebar from '../../components/Sidebar';
import TodoList from '../../components/TodoList';
import { selector } from '../../redux/slices/todosSlice';

export default function Yesterday() {
  const [addState, setAddState] = useState(false);

  const yesterday = dayjs(new Date()).subtract(1, 'day').format('YYYY-MM-DD');
  const todos = useSelector(selector.getTodos(yesterday));
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <>
      <Appbar />
      <div className="flex">
        <Sidebar active='yesterday' />
        <div className="container max-w-screen-lg py-8 px-12">
          <h1 className="text-primary font-bold text-[32px] mb-4">Yesterday</h1>
          <span>{completedCount} / {todos.length} completed</span>

          <div className='py-4'>
            {todos.map(item =>
              <TodoList
                key={item.id}
                id={item.id}
                task={item.task}
                description={item.description}
                time={item.time}
                completed={item.completed}
              />
            )}

            {todos.length == 0 && !addState &&
              <div className='text-gray mb-6'>
                <img src="/empty.svg" className='mx-auto' alt="Empty todos" />
              </div>
            }

          </div>
        </div>
      </div>
    </>
  );
}
