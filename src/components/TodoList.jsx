import { useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { BsFillPencilFill, BsThreeDots, BsArchive, BsPause } from 'react-icons/bs';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../redux/slices/todosSlice';
import TaskField from './TaskField';

const TodoList = ({
  id,
  time,
  task,
  description,
  completed
}) => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editState, setEditState] = useState(false);

  const handleDropdownFocus = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCheckboxChanged = (id, completed) => {
    dispatch(updateTodo({
      id,
      todo: {
        completed: !completed
      }
    }));
  };

  const handleRemove = (id) => {
    dispatch(removeTodo({ id }));
  };

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
      <div className="pr-4">
        <div className="flex items-center pt-2">
          <input type="checkbox" checked={completed} onChange={() => handleCheckboxChanged(id, completed)} className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary cursor-pointer" />
        </div>
      </div>
      <div className='border border-graySoft py-2 px-4 rounded-md w-full flex justify-between'>
        <div>
          <h1 className="font-bold">{task}</h1>
          <p className="text-gray">{description}</p>
        </div>
        <div className="flex items-center text-gray">
          <button className='rounded-full p-2 transition-colors duration-300 hover:bg-graySoft' onClick={() => setEditState(true)}>
            <BsFillPencilFill />
          </button>
          <button className="rounded-full p-2 transition-colors duration-300 hover:bg-graySoft" onClick={handleDropdownFocus}>
            <BsThreeDots />
          </button>
          <OutsideClickHandler
            onOutsideClick={() => dropdownOpen && handleDropdownFocus()}
          >
            <div className="relative">
              <div className={`absolute top-4 rounded-md right-0 border border-graySoft transition-all duration-400 bg-white ${dropdownOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
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
          </OutsideClickHandler>
        </div>
      </div>
    </div>
  );
};

export default TodoList;