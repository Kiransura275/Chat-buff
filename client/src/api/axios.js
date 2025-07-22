import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://chat-buff.vercel.app",
  timeout: 4000,
  withCredentials: true,
});

export default axiosInstance;
