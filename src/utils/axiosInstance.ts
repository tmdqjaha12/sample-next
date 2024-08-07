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
    if (error.response) {
      // 백엔드에서 응답한 HTTP 상태 코드가 4xx나 5xx인 경우
      // 요청url: error.response.config.url
      // console.error(error.response.data);
    } else if (error.request) {
      // 요청을 보낸 후 응답을 받지 못한 경우
      console.error("Error in Axios: Network Error");
    } else {
      // 요청을 보내기 전에 문제가 발생한 경우
      console.error("Error in Axios: Request Error");
    }
    return Promise.reject(error);
  }
);

export default instance;
