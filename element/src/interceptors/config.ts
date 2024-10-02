import { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { useMsgDataStore } from "../store/store";
import { useEffect } from "react";
import { customAxiosInstance } from "./axiosInstance";

export const useCustomAxios = () => {
  const accessToken = useMsgDataStore(
    (state) => state.messageData?.user_details.access_token
  );
  const baseUrl = useMsgDataStore((state) => state.messageData?.endpoint);

  const reqInterceptor = (config: InternalAxiosRequestConfig) => {
    config.headers = {
      Authorization: `JWT ${accessToken}`,
    } as AxiosRequestHeaders;
    config.baseURL = baseUrl;

    return config;
  };

  useEffect(() => {
    const customInterceptor =
      customAxiosInstance.interceptors.request.use(reqInterceptor);

    return () => {
      customAxiosInstance.interceptors.request.eject(customInterceptor);
    };
  }, [accessToken, baseUrl]);

  return { axios: customAxiosInstance };
};
