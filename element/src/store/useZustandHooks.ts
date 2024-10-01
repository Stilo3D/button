import { ApiEndpoint } from "../types/enums";
import { LoginRs } from "../types/interfaces";
import axios, { AxiosError } from "axios";

interface LoginArgs {
  data: { username: string; password: string };
  baseUrl: string;
}

export const zustandHooks = () => {
  const useUserLogin = async ({
    data,
    baseUrl,
  }: LoginArgs): Promise<LoginRs | AxiosError> => {
    try {
      const response = await axios.post(`${baseUrl}${ApiEndpoint.Login}`, data);
      return response.data as LoginRs;
    } catch (error) {
      return error as AxiosError;
    }
  };

  const userRefreshTheRefreshToken = async ({
    baseUrl,
    refreshToken,
  }: {
    baseUrl: string;
    refreshToken: string;
  }): Promise<LoginRs | AxiosError> => {
    try {
      const response = await axios.post(
        `${baseUrl}${ApiEndpoint.RefreshToken}`,
        { refresh: refreshToken }
      );

      return response.data as LoginRs;
    } catch (error) {
      return error as AxiosError;
    }
  };
  return { useUserLogin, userRefreshTheRefreshToken };
};
