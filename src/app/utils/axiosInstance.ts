import axios, { AxiosError, AxiosResponse } from "axios";

/**
 * * API URL
 */
const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_API_BASE_URL
    : process.env.NEXT_PUBLIC_PRO_API_BASE_URL;
/**
 * * Axios 인스턴스 생성
 */
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/**
 * * 요청 인터셉터
 * HTPP 요청을 보낸 후 응답을 받기 전에 요청 객체를 변경할 수 있습니다.
 */
instance.interceptors.request.use(
  (config) => {
    /**
      * TODO: Sample
        const token = ""
        config.headers.Authorization = `Bearer ${token}`;
    */
    return config;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

/**
 * * 응답 인터셉터
 * HTTP 응답 에러를 처리합니다.
 */
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    // console.error(error.config);
    // console.error(error.message);
    if (error.response) {
      // console.error(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default instance;
