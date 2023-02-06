import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL:
    typeof window === "undefined"
      ? "http://fastapi:8888"
      : process.env.NEXT_PUBLIC_FASTAPI_ENDPOINT,
  // responseType: "json",
  // headers: {
  //   "Content-Type": "application/json",

  // },
});
