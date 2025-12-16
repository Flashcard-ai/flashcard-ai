import axios, { AxiosError, AxiosHeaders } from "axios";
import {
  getAccessTokenMemory,
  setAccessTokenMemory,
} from "../utils/auth-memory";

//const backURL = import.meta.env.VITE_API_BASE_URL;
const apiBaseURL = backURL.endsWith('/') ? `${backURL}api/` : `${backURL}/api/`;
console.log('backURL:', backURL);
console.log('apiBaseURL:', apiBaseURL);


const api = axios.create({
  baseURL: backURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessTokenMemory();
  if (token && token !== "") {
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
      console.log("[DEBUG] Sem originalRequest, rejeitando erro:", error);
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      console.log("[DEBUG] Erro não 401, status:", error.response?.status);
      return Promise.reject(error);
    }

    if ((originalRequest as any)._retry) {
      console.log("[DEBUG] Já tentou refresh antes, rejeitando...");
      return Promise.reject(error);
    }

    (originalRequest as any)._retry = true;

    try {
      console.log("[DEBUG] Tentando refresh token...");

      const refresh = await axios.post(backURL + 'api/token/refresh/', {}, { withCredentials: true })
      console.log("[DEBUG] Resposta do refresh:", refresh.data);

      const newToken = refresh.data.access;
      setAccessTokenMemory(newToken);

      console.log("[DEBUG] Novo token salvo na memória:", newToken);

      (originalRequest.headers as AxiosHeaders).set(
        "Authorization",
        `Bearer ${newToken}`
      );

      console.log("[DEBUG] Reenviando requisição original com novo token...");
      return api(originalRequest);
    } catch (err) {
      console.error("[DEBUG] Falha ao tentar refresh:", err);
      return Promise.reject(err);
    }
  }
);

const getAPI = () => {
  return api;
};

export default getAPI;
