"use client";

import React, { useState } from "react";

const PdfPage: React.FC = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleGeneratePdf = async () => {
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

  return (
    <div className="w-full max-w-xl p-8 bg-white shadow-lg rounded-lg text-black">
      <h1 className="text-2xl font-bold text-center mb-6">PDF 포맷팅 테스트 페이지</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGeneratePdf();
        }}
        className="space-y-4"
      >
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
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
  );
};

export default PdfPage;
