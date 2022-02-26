import { useEffect, useRef, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { BsFillPencilFill, BsThreeDots, BsArchive } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import useOnClickOutside from 'use-onclickoutside';
import { fetchRemoveTodo, fetchUpdateTodo, removeTodo, updateTodo } from '../redux/slices/todosSlice';
import { todoService } from '../services/todoService';
import TaskField from './TaskField';

const TodoList = ({
  id,
  task,
  description,
  completed
}) => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editState, setEditState] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCheckboxChanged = (id, completed) => {
    dispatch(fetchUpdateTodo({
      id,
      todo: {
        completed: !completed
      }
    }));
  };

  const handleRemove = (id) => {
    dispatch(fetchRemoveTodo(id));
  };

  useOnClickOutside(dropdownRef, () => dropdownOpen && setDropdownOpen(false));

  useEffect(async () => {
    if (id == null) return;
    const unsubscribe = await todoService.subscribeTodoChange(id, (doc) => {
      const todo = doc.data();

      if (!todo) {
        dispatch(removeTodo({ id }));
      } else {
        dispatch(updateTodo({
          id,
          todo
        }));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (editState) return (
    <TaskField
      id={id}
      task={task}
      description={description}
      afterSubmit={() => setEditState(false)}
      onCancel={() => setEditState(false)}
    />
  );

  return (
    <div className='flex mb-2'>
      <div className="pr-2">
        <div className="group flex items-center pt-2">
          <input type="checkbox" className="opacity-0 absolute h-6 w-6 cursor-pointer" checked={completed} onChange={() => handleCheckboxChanged(id, completed)} />
          <div className={`${completed ? 'bg-primary' : 'bg-white'} border-2 rounded-md border-primary w-6 h-6 flex flex-shrink-0 justify-center items-center focus-within:border-primaryDark cursor-pointer`}>
            <svg className="fill-current opacity-0 transition-all duration-200 w-3 h-3 text-blue-600 pointer-events-none" version="1.1" viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <g transform="translate(-9 -11)" fill={completed ? 'white' : '#f3532b'} fillRule="nonzero">
                  <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className='group border border-graySoft py-2 px-4 rounded-md w-full flex justify-between'>
        <div>
          <h1 className="font-bold">{task}</h1>
          <p className="text-gray">{description}</p>
        </div>
        <div ref={dropdownRef} className={`flex items-center text-gray transition-all duration-200 ${dropdownOpen ? '' : 'md:opacity-0'} group-hover:opacity-100`}>
          <button className='rounded-full p-2 transition-colors duration-300 hover:bg-graySoft' onClick={() => setEditState(true)}>
            <BsFillPencilFill />
          </button>
          <button className="rounded-full p-2 transition-colors duration-300 hover:bg-graySoft" onClick={toggleDropdown}>
            <BsThreeDots />
          </button>
          <div className="relative">
            <div className={`absolute z-10 top-4 rounded-md right-0 border border-graySoft transition-all duration-400 bg-white ${dropdownOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
              <div className='px-4 hover:bg-graySoft cursor-pointer py-2 flex items-center'>
                <BsArchive size={16} className="mr-4 inline" />
                <span>Archive</span>
              </div>
              <button className="w-full" onClick={() => handleRemove(id)}>
                <div className='text-primary px-4 hover:bg-graySoft cursor-pointer py-2 flex items-center'>
                  <BsFillTrashFill size={16} className="mr-4 inline" />
                  <span>Delete</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;