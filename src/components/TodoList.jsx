import { useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { BsFillPencilFill, BsThreeDots, BsArchive, BsPause } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../redux/slices/todosSlice';

const TodoList = ({
  id,
  time,
  task,
  description,
  completed
}) => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownFocus = () => {
    setDropdownOpen(true);
  };

  const handleDropdownBlur = () => {
    setDropdownOpen(false);
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
          <button className='mr-4'>
            <BsFillPencilFill />
          </button>
          <div className="relative">
            <button onClick={handleDropdownFocus}>
              <BsThreeDots />
            </button>
            <div className={`absolute top-7 rounded-md right-0 border border-graySoft bg-white ${dropdownOpen ? 'visible' : 'invisible'}`}>
              <div className='px-4 hover:bg-graySoft cursor-pointer py-2 flex items-center'>
                <BsArchive size={16} className="mr-4 inline" />
                <span>Archive</span>
              </div>
              <button onClick={() => handleRemove(id)}>
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