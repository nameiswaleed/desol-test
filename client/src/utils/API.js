import axios from "axios";
const token = globalThis.localStorage?.getItem("x-auth-token");
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "x-auth-token": token || "",
    "Content-Type": "application/json",
  },
});

export default API;
