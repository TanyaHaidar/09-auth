import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_BASE_URL || "https://notehub-api.goit.study";
const baseURL = base.endsWith("/") ? `${base}api` : `${base}/api`;

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
