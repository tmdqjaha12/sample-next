"use client";

import axios from "axios";
import { format, parseISO } from "date-fns";
import { useCallback } from "react";

const DateFnsPage = () => {
  const date = parseISO("2023-07-30T00:00:00.000Z");
  const formattedDate = format(date, "yyyy-MM-dd");

  const getTestFn = useCallback(() => {
    axios
      .get("http://localhost:9090/api/test/get")
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }, []);
  const postTestFn = useCallback(() => {
    axios
      .post("http://localhost:9090/api/test/post")
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="relative w-64 text-black">
      <div>
        <h1 className="text-2xl font-bold mb-4 ">date-fns 테스트 페이지</h1>
        <p>Formatted Date: {formattedDate}</p>
        <button
          onClick={getTestFn}
          className="bg-blue-500 text-white p-2 m-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Get Test Button
        </button>
        <button
          onClick={postTestFn}
          className="bg-green-500 text-white p-2 m-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Post Test Button
        </button>
      </div>
    </div>
  );
};

export default DateFnsPage;
