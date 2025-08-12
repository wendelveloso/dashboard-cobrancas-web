import axios from "axios";
import { getItem } from "../utils/storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Authorization: getItem("token") ? `Bearer ${getItem("token")}` : "",
  },
});

export default api;
