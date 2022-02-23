import dayjs from 'dayjs';
import React from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";
import AddTask from '../../components/AddTask';
import Appbar from "../../components/Appbar";

import Sidebar from '../../components/Sidebar';
import TaskField from '../../components/TaskField';
import TodoList from '../../components/TodoList';
import { selector } from '../../redux/slices/todosSlice';

export default function Yesterday() {
  const [addState, setAddState] = useState(false);

  const yesterday = dayjs(new Date()).subtract(1, 'day');
  const todos = useSelector(selector.getTodos(yesterday));
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <>
      <Appbar />
      <div className="flex">
        <Sidebar active='yesterday' />
        <div className="container mx-auto py-8 px-12">
          <h1 className="text-primary font-bold text-[32px] mb-4">Yesterday</h1>
          <span>{completedCount} / {todos.length} completed</span>

          <div className='py-4'>
            {todos.map(item =>
              <TodoList
                key={item.time}
                id={item.id}
                task={item.task}
                description={item.description}
                time={item.time}
                completed={item.completed}
              />
            )}

            {todos.length == 0 &&
              <div className='text-gray mb-6'>
                Nothing task is created
              </div>
            }

            {/* add task */}
            {!addState &&
              <AddTask setAddState={setAddState} />
            }

            {/* task field */}
            {addState &&
              <TaskField
                afterSubmit={() => setAddState(false)}
                onCancel={() => setAddState(false)}
              />
            }

          </div>
        </div>
      </div>
    </>
  );
}
