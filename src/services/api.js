import axios from "axios";
import {getItem} from "../utils/storage"

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: getItem("token") ? `Bearer ${getItem("token")}` : "",
  timeout: 10000,
  },
});

export default api;
 