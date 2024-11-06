import { ApiEndpoint } from "../types/enums";
import axios from "axios";
import { LoginParameters, LoginResponse } from "../types/interfaces";
import { apiCall } from "../setups/axios/axiosInstance";
import { useMsgDataStore } from "./store";

export const useAuthentication = () => {
  const baseUrl = useMsgDataStore((state) => state.messageData?.endpoint) ?? "";
  const logIn = async ({
    data,
  }: LoginParameters): Promise<LoginResponse | undefined> => {
    try {
      const response = await axios.post<LoginResponse>(
        baseUrl + ApiEndpoint.Login,
        data
      );

      return response.data;
    } catch {
      throw new Error("Error while logging in in developer mode");
    }
  };

  const refreshToken = async ({
    refreshToken,
  }: {
    refreshToken: string;
  }): Promise<LoginResponse | undefined> => {
    try {
      const response = await apiCall.post<LoginResponse>(
        ApiEndpoint.RefreshToken,
        {
          refresh: refreshToken,
        }
      );

      return response.data;
    } catch {
      throw new Error("Error while refreshing token in developer mode");
    }
  };
  return { logIn, refreshToken };
};
