"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useMemo, useState } from "react";

const HomePage = () => {
  const router = useRouter();

  const [selectedTask, setSelectedTask] = useState("Task Selector");
  const tasks = useMemo(
    () => [
      {
        label: "date-fns",
        path: "/date-fns",
      },
      {
        label: "pdf-format",
        path: "/pdf-format",
      },
      {
        label: "search-area",
        path: "/fn-ins",
      },
      {
        label: "burn-scroll",
        path: "/burn-scroll",
      },
      {
        label: "code-f",
        path: "/code-f",
      },
    ],
    []
  );

  const onHandleSelectTask = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectValue = e.target.value;
    const selectOptionText = e.target.options[e.target.selectedIndex].text;

    setSelectedTask(selectOptionText);
    router.push(selectValue);
  };

  return (
    <div>
      <select
        value={selectedTask}
        onChange={onHandleSelectTask}
        className="block appearance-none w-full bg-white text-gray-700 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="Task Selector" disabled>
          Select a task
        </option>
        {tasks.map((task, index) => (
          <option key={index} value={task.path}>
            {task.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.707 7.293a1 1 0 011.414 0L10 10.586l2.879-3.293a1 1 0 111.415 1.415l-3.586 4.07a1 1 0 01-1.414 0l-3.586-4.07a1 1 0 010-1.415z" />
        </svg>
      </div>
    </div>
  );
};

export default HomePage;
