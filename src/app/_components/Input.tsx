import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  type: "text" | "email" | "password" | "textarea" | "number" | "tel" | "url";
  register: UseFormRegisterReturn;
  params?: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
  icons?: {
    prepend?: React.ReactNode;
    append?: React.ReactNode;
  };
  feed?: string;
  hidden?: boolean;
  option?: any;
};

const Input: React.FC<InputProps> = ({ type, register, params, icons, feed, hidden, option }) => {
  const InputElement = type === "textarea" ? "textarea" : "input";

  if (hidden) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-1">
      {icons && icons?.prepend && <div className="icon-container">{icons.prepend}</div>}
      <InputElement
        {...register}
        {...params}
        type={type !== "textarea" ? type : undefined}
        className={`border p-2 rounded-lg focus:outline-none ${
          feed ? "border-red-500" : "border-gray-300"
        } focus:ring-2 ${feed ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
      />
      {icons && icons?.append && <div className="icon-container">{icons.append}</div>}

      {feed && <p className="text-red-500 text-sm mt-1">{feed}</p>}
    </div>
  );
};

export default Input;
