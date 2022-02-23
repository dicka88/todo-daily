import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/slices/todosSlice";

const TaskField = ({ setAddState }) => {
  const dispatch = useDispatch();
  const initialFormState = {
    task: '',
    description: ''
  };
  const [form, setForm] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleCancel = () => {
    setAddState(false);
    setForm(initialFormState);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.task) return;

    dispatch(addTodo(form));
    setAddState(false);
  };

  return (
    <div className='flex mb-2'>
      <div className="pr-4 invisible">
        <div className="flex items-center pt-2">
          <input type="checkbox" className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary cursor-pointer" />
        </div>
      </div>
      <div className='w-full'>
        <form onSubmit={handleFormSubmit}>
          <div className='border bg-grayLight border-graySoft rounded-md w-full flex justify-between mb-4'>
            <div className='w-full'>
              <div className="mb-2 border-b border-[#cfcfcf] py-2 px-4">
                <input type="text" className="font-bold bg-transparent w-full outline-none" autoComplete="off" autoCapitalize="on" name="task" onChange={handleInputChange} placeholder='Task title' />
              </div>
              <textarea className="w-full resize-none bg-transparent outline-none px-4 text-gray" name="description" onChange={handleInputChange} placeholder='Description'></textarea>
            </div>
          </div>
          <button type="submit" className='bg-primary text-white rounded-md p-1 px-4 mr-4'>
            Add task
          </button>
          <button className='border border-primary text-primary rounded-md p-1 px-4' onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskField;