import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: typeof window === "undefined" ? "http://fastapi:8888" : "http://localhost:8888"
  // responseType: "json",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});