import { BsFillPlusCircleFill } from "react-icons/bs";

const AddTask = ({ setAddState }) => {
  return (
    <div className='my-4'>
      <button onClick={() => setAddState(true)}>
        <div className="pr-4 text-primary flex items-center">
          <BsFillPlusCircleFill size={22} className='mr-6' />
          <span className="text-primary">Add task</span>
        </div>
      </button>
    </div>
  );
};

export default AddTask;