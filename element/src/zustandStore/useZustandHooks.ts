import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ApiEndpoint } from "../types/enums";
import { LoginRs } from "../types/interfaces";

interface LoginArgs {
  data: { username: string; password: string };
  baseUrl: string;
}

export const zustandHooks = () => {
  const useUserLogin = async ({
    data,
    baseUrl,
  }: LoginArgs): Promise<LoginRs | FetchBaseQueryError> => {
    try {
      const response = await fetch(`${baseUrl}${ApiEndpoint.Login}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      return response.json();
    } catch (error) {
      return error as FetchBaseQueryError;
    }
  };

  const userRefreshTheRefreshToken = async ({
    baseUrl,
    refreshToken,
  }: {
    baseUrl: string;
    refreshToken: string;
  }): Promise<LoginRs | FetchBaseQueryError> => {
    try {
      const response = await fetch(`${baseUrl}${ApiEndpoint.RefreshToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Refresh token failed");
      }

      return response.json();
    } catch (error) {
      return error as FetchBaseQueryError;
    }
  };
  const useGetUser = async ({
    baseUrl,
    token,
  }: {
    baseUrl: string;
    token: string;
  }) => {
    const response = await fetch(`${baseUrl}${ApiEndpoint.Users}me/`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Get user failed");
    }

    return response.json();
  };
  return { useUserLogin, userRefreshTheRefreshToken, useGetUser };
};
