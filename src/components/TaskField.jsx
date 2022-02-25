import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import { fetchAddTodo, fetchUpdateTodo, } from "../redux/slices/todosSlice";

const TaskField = ({ id, task, date, description, afterSubmit, onCancel }) => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const initialFormState = {
    uid: user.uid,
    task: "",
    date,
    description: "",
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
    setForm(initialFormState);
    onCancel();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.task) return;

    if (id) {
      dispatch(fetchUpdateTodo({
        id, todo: {
          task: form.task,
          description: form.description
        }
      }));
    } else {
      dispatch(fetchAddTodo(form));
    }
    afterSubmit();
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
                <input type="text"
                  className="font-bold bg-transparent w-full outline-none"
                  autoComplete="off"
                  autoCapitalize="on"
                  autoFocus
                  name="task"
                  value={form.task}
                  onChange={handleInputChange}
                  placeholder='Task title'
                />
              </div>
              <textarea
                className="w-full resize-none bg-transparent outline-none px-4 text-gray"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                placeholder='Description'></textarea>
            </div>
          </div>
          <button type="submit" disabled={!form.task} className='bg-primary  text-white rounded-md p-1 px-4 mr-2 disabled:bg-red-400'>
            Save
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