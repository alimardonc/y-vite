import axios from "axios";
import { removeAuthTokens } from "./token";

export const SERVER_URL = import.meta.env.VITE_PUBLIC_API_URL;
export const S3_URL = import.meta.env.VITE_PUBLIC_S3_URL;

export const axiosClient = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

let isRefreshing = false;

async function refresh() {
  try {
    const r = localStorage.getItem("refresh_token");
    const { data } = await axios.post(
      `${SERVER_URL}/auth/refresh/`,
      { refresh: r },
      {
        withCredentials: true,
      },
    );

    localStorage.setItem("access_token", data.access);
    return data.access;
  } catch (error) {
    console.error("REFRESH ERROR", error);
    removeAuthTokens();
    return null;
  }
}

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            const newToken = localStorage.getItem("access_token");
            if (newToken) {
              clearInterval(interval);
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(axiosClient(originalRequest));
            }
          }, 200);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const newToken = await refresh();
      isRefreshing = false;

      if (!newToken) return Promise.reject(error);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axiosClient(originalRequest);
    }

    return Promise.reject(error);
  },
);
