import axios, { AxiosError, AxiosHeaders } from "axios";
import {
  getAccessTokenMemory,
  setAccessTokenMemory,
} from "../utils/auth-memory";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessTokenMemory();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if ((originalRequest as any)._retry) {
      return Promise.reject(error);
    }

    (originalRequest as any)._retry = true;

    try {
      const refresh = await api.post("/auth/refresh");
      const newToken = refresh.data.access_token;

      setAccessTokenMemory(newToken);

      (originalRequest.headers as AxiosHeaders).set(
        "Authorization",
        `Bearer ${newToken}`
      );

      return api(originalRequest);
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

const getAPI = () => {
  return api;
};

export default getAPI;
