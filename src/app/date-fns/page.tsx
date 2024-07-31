import { format, parseISO } from "date-fns";

const DateFnsPage = () => {
  const date = parseISO("2023-07-30T00:00:00.000Z");
  const formattedDate = format(date, "yyyy-MM-dd");

  return (
    <div className=" text-black">
      <div>
        <h1 className="text-2xl font-bold mb-4 ">date-fns 테스트 페이지</h1>
        <p>Formatted Date: {formattedDate}</p>
      </div>
    </div>
  );
};

export default DateFnsPage;
