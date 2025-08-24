import axios from "axios";
import { getItem } from "../utils/storage";

let globalLoadingSetter = null;

export const setGlobalLoadingSetter = (setter) => {
  globalLoadingSetter = setter;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Authorization: getItem("token") ? `Bearer ${getItem("token")}` : "",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (globalLoadingSetter) globalLoadingSetter(true);
    return config;
  },
  (error) => {
    if (globalLoadingSetter) globalLoadingSetter(false);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (globalLoadingSetter) globalLoadingSetter(false);
    return response;
  },
  (error) => {
    if (globalLoadingSetter) globalLoadingSetter(false);
    return Promise.reject(error);
  }
);

export default api;
