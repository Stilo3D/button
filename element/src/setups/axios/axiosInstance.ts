import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";

export const apiCall = axios.create();

let interceptorId: number | null = null;

export const reinitializeAxiosConfig = (accessToken: string, baseUrl: string) => {
  if (interceptorId !== null) {
    apiCall.interceptors.request.eject(interceptorId);
  }

  interceptorId = apiCall.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.headers = {
        Authorization: `JWT ${accessToken}`,
      } as AxiosRequestHeaders;
      config.baseURL = baseUrl;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
