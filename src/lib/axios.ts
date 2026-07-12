import { getCookie } from "@/utils/getCookies";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  withCredentials: true,
});
const accessToken = getCookie("token");
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token ?? accessToken;
  }

  return config;
});

export default api;
