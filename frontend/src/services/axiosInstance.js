import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/auth',
});

// Add JWT token to request headers
axiosInstance.interceptors.request.use((config) => {
  // Get token from cookie
  const token = document.cookie?.split(';').find((cookie) => cookie.trim().startsWith('token='))?.split('=')[1];
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
