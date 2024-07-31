import Link from "next/link";
import { FaSearch } from "react-icons/fa"; // Import a search icon from react-icons

// Define the possible colors
const colors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-orange-500",
];

// Function to get a random color
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const menu = [
  { label: "보험분석", path: "#" },
  { label: "보험금 청구서", path: "#" },
  { label: "보험사 등기 우편 주소", path: "#" },
  { label: "과실 비율", path: "#" },
  { label: "비급여 진료비 조회", path: "#" },
  { label: "소비자선택 손해사정(추후 업뎃)", path: "#" },
];

const PageComponent = () => {
  return (
    <div className="w-full h-full mx-16 text-black">
      <div className="flex flex-col items-center w-full bg-white rounded-lg shadow-lg pb-20 pt-5 pl-8 pr-8">
        {/* header */}
        <div className="flex justify-between items-center w-full mb-20">
          <div className="text-xl font-bold">Test</div>
          <div className="flex items-center space-x-2">
            <span></span>
            <span></span>
          </div>
        </div>

        {/* search-area */}
        <div className="relative w-96 mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg pl-10"
            placeholder="사건번호, 키워드를 입력하세요."
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* menu */}
        <div className="grid grid-cols-6 gap-4">
          {menu.map((item, index) => (
            <div key={`menu_${index}`} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full ${getRandomColor()}`}></div>
              <span className="mt-2 text-sm">
                <Link href={item.path}>{item.label}</Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageComponent;
