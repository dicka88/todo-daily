import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import { fetchAddTodo, fetchUpdateTodo } from "../redux/slices/todosSlice";
import PrimaryButton from "./ui/PrimaryButton";
import SecondaryButton from "./ui/SecondaryButton";

const TaskField = ({ id, task, date, description, afterSubmit, onCancel }) => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const initialFormState = {
    uid: user.uid,
    task: task || "",
    date,
    description: description || "",
  };
  const [form, setForm] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
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
      dispatch(
        fetchUpdateTodo({
          id,
          todo: {
            task: form.task,
            description: form.description,
          },
        })
      );
    } else {
      dispatch(fetchAddTodo(form));
    }
    afterSubmit();
  };

  return (
    <div className="flex mb-2">
      <div className="pr-4 invisible">
        <div className="flex items-center pt-2">
          <input
            type="checkbox"
            className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary cursor-pointer"
          />
        </div>
      </div>
      <div className="w-full">
        <form onSubmit={handleFormSubmit}>
          <div className="border bg-grayLight dark:bg-zinc-700 border-graySoft dark:border-zinc-500 rounded-md w-full flex justify-between mb-4">
            <div className="w-full">
              <div className="mb-2 border-b border-[#cfcfcf] py-2 px-4">
                <input
                  type="text"
                  className="font-bold bg-transparent w-full outline-none"
                  autoComplete="off"
                  autoCapitalize="on"
                  autoFocus
                  name="task"
                  value={form.task}
                  onChange={handleInputChange}
                  placeholder={t("taskTitle")}
                />
              </div>
              <textarea
                className="w-full resize-none bg-transparent outline-none px-4 text-gray dark:text-graySoft"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                placeholder={t("description")}
              ></textarea>
            </div>
          </div>
          <PrimaryButton
            disabled={!form.task}
            type="submit"
            className={"py-1 px-4 mr-2"}
          >
            {t("save")}
          </PrimaryButton>
          <SecondaryButton
            className="border border-primary text-primary rounded-md p-1 px-4"
            onClick={handleCancel}
          >
            {t("cancel")}
          </SecondaryButton>
        </form>
      </div>
    </div>
  );
};

export default TaskField;
