import axios from "axios";
import { BASE_URL } from "../constants";

export const request = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: false,
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // Handle unauthorized globally
      if (status === 401) {
        console.warn("Unauthorized — token invalid or expired.");
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

export default request;
