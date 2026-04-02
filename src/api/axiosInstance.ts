import axios from "axios";
import { useAuthStore } from "../features/auth/store/auth.store";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Check if the error is due to an unauthorized token and it has not been retried yet
    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      
      try {
        await api.post("/auth/refresh");
        
        // If refresh is successful, retry the original request
        return api.request(originalRequest);
      } catch (refreshError) {
        // If the refresh token also fails or is expired, clear user state
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);