import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { selector } from "../../redux/slices/todosSlice";

import Appbar from "../../components/ui/Appbar";
import Sidebar from "../../components/Sidebar";
import TodoList from "../../components/TodoList";

export default function Yesterday() {
  const { t } = useTranslation();
  const yesterday = dayjs().subtract(1, "d").format("YYYY-MM-DD");

  const todos = useSelector(selector.getTodos(yesterday));
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <>
      <Appbar />
      <div className="flex">
        <Sidebar active="yesterday" />
        <div className="container max-w-screen-lg py-8 px-12">
          <h1 className="text-primary font-bold text-[32px] mb-4">
            {t("menuYesterday")}
          </h1>
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

            {todos.length == 0 && (
              <div className="text-gray mb-6">
                <img src="/empty.svg" className="mx-auto" alt="Empty todos" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
