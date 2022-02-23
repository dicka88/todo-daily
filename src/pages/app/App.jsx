import React from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";
import AddTask from '../../components/AddTask';
import Appbar from "../../components/Appbar";

import Sidebar from '../../components/Sidebar';
import TaskField from '../../components/TaskField';
import TodoList from '../../components/TodoList';
import { selector } from '../../redux/slices/todosSlice';

export default function App() {
  const [addState, setAddState] = useState(false);

  const today = new Date();
  const todos = useSelector(selector.getTodos(today));
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <>
      <Appbar />
      <div className="flex">
        <Sidebar />
        <div className="container mx-auto py-8 px-12">
          <h1 className="text-primary font-bold text-[32px] mb-4">Today</h1>
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

            {/* add task */}
            {!addState &&
              <AddTask setAddState={setAddState} />
            }

            {/* task field */}
            {addState &&
              <TaskField setAddState={setAddState} />
            }

          </div>
        </div>
      </div>
    </>
  );
}
