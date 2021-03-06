import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { selector } from "../../redux/slices/todosSlice";

import AddTask from "../../components/AddTask";
import Appbar from "../../components/ui/Appbar";
import Sidebar from "../../components/Sidebar";
import TaskField from "../../components/TaskField";
import TodoList from "../../components/TodoList";

export default function Upcoming() {
  const { t } = useTranslation();
  const tommorow = dayjs().add(1, "day").format("YYYY-MM-DD");

  const [addState, setAddState] = useState(false);
  const [dateActive, setDateActive] = useState(tommorow);

  const days = [];

  // 7 day forward
  for (let i = 1; i <= 7; i++) {
    days.push(dayjs().add(i, "day").format("YYYY-MM-DD"));
  }

  const todos = useSelector(selector.getTodos(dateActive));
  const completedCount = todos.filter((todo) => todo.completed).length;

  const handleDateClick = (date) => {
    setDateActive(date);
  };

  return (
    <>
      <Appbar />
      <div className="flex">
        <Sidebar active="future" />
        <div className="container max-w-screen-lg py-8 px-12">
          <h1 className="text-primary font-bold text-[32px] mb-4">
            {t("menuUpcoming")}
          </h1>

          <div className="flex mb-4 overflow-x-auto">
            {days.map((day) => (
              <div
                key={day}
                className="min-w-[100px] max-w-[100px] basis-1/4 md:basis-1/7"
                onClick={() => handleDateClick(day)}
              >
                <div
                  className={`flex justify-center transition-colors duration-300 items-center aspect-square hover:bg-graySoft dark:hover:bg-zinc-700 cursor-pointer ${
                    dateActive == day
                      ? "bg-graySoft dark:bg-zinc-700 border-b-4 border-primary"
                      : ""
                  }`}
                >
                  <div className="text-center">
                    <small className="text-gray">
                      {dayjs(day).locale("id").format("ddd")}
                    </small>

                    <h1 className="text-primary font-bold text-[28px]">
                      {dayjs(day).locale("id").format("D")}
                    </h1>
                    <small className="text-gray">
                      {dayjs(day).format("MMM YYYY")}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <span>
            {completedCount} / {todos.length} {t("completed")}
          </span>

          <div className="py-4">
            {todos.map((item, i) => (
              <TodoList
                key={i}
                id={item.id}
                task={item.task}
                description={item.description}
                completed={item.completed}
              />
            ))}

            {todos.length == 0 && !addState && (
              <div className="text-gray mb-6">
                <img src="/empty.svg" className="mx-auto" alt="Empty todos" />
              </div>
            )}

            {/* add task */}
            {!addState && (
              <div className={todos.length == 0 ? `text-center` : ""}>
                <AddTask setAddState={setAddState} />
              </div>
            )}

            {/* task field */}
            {addState && (
              <TaskField
                date={dateActive}
                setAddState={setAddState}
                afterSubmit={() => setAddState(false)}
                onCancel={() => setAddState(false)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
