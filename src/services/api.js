import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default api;
