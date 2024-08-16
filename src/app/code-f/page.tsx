"use client";

import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  organization: string;
  loginType: string;
  loginTypeLevel: string;
  phoneNo: string;
  telecom: string;
  userName: string;
  identity: string;
  startDate: string;
  endDate: string;
  id: string;
  type: string;
  client_id: string;
  client_secret: string;
}

const PageComponent = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({ mode: "all", criteriaMode: "firstError", shouldFocusError: true });

  const [formData, setFormData] = useState<FormData>({
    organization: "0020",
    loginType: "2",
    loginTypeLevel: "0",
    phoneNo: "",
    telecom: "",
    userName: "",
    identity: "",
    startDate: "",
    endDate: "",
    id: "",
    type: "0",
    client_id: "",
    client_secret: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 폼 제출 시 처리 로직 추가
    testReq();
  };

  const handleTokenSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 폼 제출 시 처리 로직 추가
    token();
  };

  const token = () => {
    axios
      // .post("https://development.codef.io", {
      .post(
        "https://toauth.codef.io/oauth/token",
        {
          grant_type: "client_credentials",
          client_id: formData.client_id,
          client_secret: formData.client_secret,
          scope: "read", // 필요한 스코프 추가 (옵션)
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log("token: ", res.data);
      })
      .catch((err) => {
        console.error("token: ", err);
      });
  };

  const auth = () => {
    axios
      .post("https://oauth.codef.io/oauth/token")
      .then((res) => {
        console.log("auth: ", res.data);
      })
      .catch((err) => {
        console.error("auth: ", err);
      });
  };

  const testReq = () => {
    axios
      .post("https://development.codef.io/v1/kr/public/hw/hira-list/my-medical-information", {
        // .post("https://api.codef.io/v1/kr/public/hw/hira-list/my-medical-information", {
        organization: formData.organization,
        loginType: formData.loginType,
        loginTypeLevel: formData.loginTypeLevel,
        phoneNo: formData.phoneNo,
        telecom: formData.telecom,
        userName: formData.userName,
        identity: formData.identity,
        startDate: formData.startDate,
        endDate: formData.endDate,
        id: formData.id,
        type: formData.type,
      })
      .then((res) => {
        console.log("testReq: ", res.data);
      })
      .catch((err) => {
        console.error("testReq: ", err);
      });
  };

  return (
    <div className="w-full h-full mx-16 text-black my-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Form 입력</h2>
        <form onSubmit={handleSubmit}>
          {/* Organization */}
          <div className="mb-4">
            <label className="block text-gray-700">기관코드 (Organization)</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          {/* Login Type */}
          <div className="mb-4">
            <label className="block text-gray-700">로그인 구분 (Login Type)</label>
            <select
              name="loginType"
              value={formData.loginType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            >
              <option value="2">인증서 또는 휴대폰인증</option>
              <option value="5">간편인증</option>
            </select>
          </div>

          {/* Login Type Level */}
          <div className="mb-4">
            <label className="block text-gray-700">로그인 인증 구분 (Login Type Level)</label>
            <select
              name="loginTypeLevel"
              value={formData.loginTypeLevel}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              {/* 각 loginType에 따라 옵션을 설정해야 합니다 */}
              {formData.loginType === "2" ? (
                <>
                  <option value="0">인증서</option>
                  <option value="1">휴대폰</option>
                </>
              ) : (
                <>
                  <option value="1">카카오톡</option>
                  <option value="2">페이코</option>
                  <option value="3">삼성패스</option>
                  <option value="4">KB모바일</option>
                  <option value="5">통신사(PASS)</option>
                  <option value="6">네이버</option>
                  <option value="7">신한인증서</option>
                  <option value="8">Toss</option>
                </>
              )}
            </select>
          </div>

          {/* Phone No */}
          <div className="mb-4">
            <label className="block text-gray-700">전화번호 (Phone No)</label>
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="전화번호 입력"
              required={(formData.loginType === "2" && formData.loginTypeLevel === "1") || formData.loginType === "5"}
            />
          </div>

          {/* Telecom */}
          <div className="mb-4">
            <label className="block text-gray-700">통신사 (Telecom)</label>
            <select
              name="telecom"
              value={formData.telecom}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required={
                (formData.loginType === "2" && formData.loginTypeLevel === "1") ||
                (formData.loginType === "5" && formData.loginTypeLevel === "5")
              }
            >
              <option value="0">SKT</option>
              <option value="1">KT</option>
              <option value="2">LG U+</option>
              <option value="3">알뜰폰 (SKT)</option>
              <option value="4">알뜰폰 (KT)</option>
              <option value="5">알뜰폰 (LG U+)</option>
            </select>
          </div>

          {/* User Name */}
          <div className="mb-4">
            <label className="block text-gray-700">사용자 이름 (User Name)</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="사용자 이름 입력"
              required
            />
          </div>

          {/* Identity */}
          <div className="mb-4">
            <label className="block text-gray-700">사용자 주민번호 (Identity)</label>
            <input
              type="text"
              name="identity"
              value={formData.identity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="주민번호 입력"
              required
            />
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block text-gray-700">시작일자 (Start Date)</label>
            <input
              type="text"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="yyyyMMdd"
              required
            />
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label className="block text-gray-700">종료일자 (End Date)</label>
            <input
              type="text"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="yyyyMMdd"
              required
            />
          </div>

          {/* ID */}
          <div className="mb-4">
            <label className="block text-gray-700">요청 식별 아이디 (ID)</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="요청 식별 아이디"
            />
          </div>

          {/* Type */}
          <div className="mb-4">
            <label className="block text-gray-700">구분 (Type)</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              <option value="0">미포함</option>
              <option value="1">포함</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">
            Submit
          </button>
        </form>
      </div>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
        <h2 className="text-2xl font-bold mb-4">token Form 입력</h2>
        <form onSubmit={handleTokenSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">client_id</label>
            <input
              type="text"
              name="client_id"
              value={formData.client_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">client_secret</label>
            <input
              type="text"
              name="client_secret"
              value={formData.client_secret}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PageComponent;
