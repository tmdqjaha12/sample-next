"use client";

import Input from "@/app/_components/Input";
import React, { useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";

type FormValues = {
  name: string;
  address: string;
  phone: string;
};

const PdfPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "all", criteriaMode: "firstError", shouldFocusError: true });

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleGeneratePdf: SubmitHandler<FormValues> = async (data) => {
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pdfType: "test01", name, address, phone }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "filled_template.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.error("Failed to generate PDF");
    }
  };

  // 유효하지 않은 폼 데이터 처리 (선택적)
  const handleError: SubmitErrorHandler<FormValues> = (errors) => {
    console.error("Form errors:", errors);
    // 에러 처리 로직을 여기에 작성합니다
  };

  console.log(errors);

  return (
    <div className="relative w-64 text-black">
      <div className="w-full max-w-xl p-8 bg-white shadow-lg rounded-lg text-black">
        <h1 className="text-2xl font-bold text-center mb-6">PDF 포맷팅 테스트 페이지</h1>
        <form onSubmit={handleSubmit(handleGeneratePdf, handleError)} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="name">
              Name:
            </label>
            <Input
              type="text"
              register={register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              params={{
                className: "border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                placeholder: "Enter your name",
              }}
              feed={errors.name?.message}
              icons={{
                prepend: <FaSearchPlus className="absolute top-40 left-3 transform text-gray-500" />,
                append: <FaSearchMinus className="absolute top-40 right-3 transform text-gray-500" />,
              }}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="address">
              Address:
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
              Phone:
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Generate PDF
          </button>
        </form>
      </div>
    </div>
  );
};

export default PdfPage;
