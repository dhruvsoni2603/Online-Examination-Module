import axios from "axios";
import { getToken } from "./jwt";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Add JWT token to request headers
axiosInstance.interceptors.request.use((config) => {
  // Get token from cookie
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
