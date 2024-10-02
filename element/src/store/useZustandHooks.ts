import { ApiEndpoint } from "../types/enums";
import { AxiosError } from "axios";
import { LoginArgs, LoginRs } from "../types/interfaces";
import { useCustomAxios } from "../interceptors/config";

export const useZustandHooks = () => {
  const { axios } = useCustomAxios();

  const logIn = async ({ data }: LoginArgs): Promise<LoginRs | AxiosError> => {
    try {
      const response = await axios.post(ApiEndpoint.Login, data);

      return response.data as LoginRs;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  };

  const refreshToken = async ({
    refreshToken,
  }: {
    refreshToken: string;
  }): Promise<LoginRs | AxiosError> => {
    try {
      const response = await axios.post(ApiEndpoint.RefreshToken, {
        refresh: refreshToken,
      });

      return response.data as LoginRs;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  };
  return { logIn, refreshToken };
};
