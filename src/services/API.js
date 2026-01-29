import axios from "axios";

// Ensure baseURL has https:// prefix
let baseURL = process.env.REACT_APP_BASEURL || "http://localhost:8080/api/v1";
if (baseURL && !baseURL.startsWith("http://") && !baseURL.startsWith("https://")) {
  baseURL = "https://" + baseURL;
}

const API = axios.create({ baseURL });

// Request interceptor - add token to headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token.trim()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle 401 if we're not on login/register pages
    if (error.response?.status === 401) {
      const isAuthPage = window.location.pathname.includes('/login') ||
                         window.location.pathname.includes('/register');

      if (!isAuthPage) {
        // Check if token exists - if it does but we got 401, token is invalid
        const token = localStorage.getItem("token");
        if (token) {
          console.log("Token invalid or expired, clearing...");
          localStorage.removeItem('token');
          // Use setTimeout to prevent redirect loop
          setTimeout(() => {
            window.location.href = '/login';
          }, 100);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;
