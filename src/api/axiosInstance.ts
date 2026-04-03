import axios from "axios";
import qs from "qs";
import { useAuthStore } from "../features/auth/store/auth.store";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
    }
});

let refreshPromise: Promise<void> | null = null;

const AUTH_ROUTES_TO_SKIP = ["/auth/login", "/auth/signup", "/auth/refresh", "/auth/logout"];

const shouldSkipRefresh = (url?: string) => {
  if (!url) return false;
  return AUTH_ROUTES_TO_SKIP.some((route) => url.includes(route));
};

api.interceptors.response.use( 
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as typeof error.config & { _isRetry?: boolean };
    
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry &&
      !shouldSkipRefresh(originalRequest.url)
    ) {
      originalRequest._isRetry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = api.post("/auth/refresh").then(() => undefined);
        }

        await refreshPromise;
        return api.request(originalRequest);
      } catch (refreshError) {
        await useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        refreshPromise = null;
      }
    }
    
    return Promise.reject(error);
  }
);
