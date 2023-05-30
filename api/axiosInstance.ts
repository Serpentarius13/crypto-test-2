import axios, { AxiosInstance } from "axios";

function makeAxiosInstance(): AxiosInstance {
  const baseUrl = useRuntimeConfig().public.baseUrl;

  if (typeof baseUrl !== "string") throw new Error("No base url provided");

  const instance = axios.create({
    baseURL: baseUrl,
  });

  return instance;
}

export const axiosInstance = makeAxiosInstance();
