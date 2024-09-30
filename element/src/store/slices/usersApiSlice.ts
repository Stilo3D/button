import { apiSlice } from "./apiSlice";
import { ApiEndpoint } from "../../types/enums";
import { LoginArgs, LoginRs, UserInfo } from "../../types/interfaces";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginRs, LoginArgs>({
      query: ({ data, baseUrl }) => ({
        url: `${baseUrl}${ApiEndpoint.Login}`,
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: builder.mutation<
      LoginRs,
      { baseUrl: string; refreshToken: string }
    >({
      query: ({ refreshToken, baseUrl }) => ({
        url: `${baseUrl}${ApiEndpoint.RefreshToken}`,
        method: "POST",
        body: { refresh: refreshToken },
      }),
    }),
    getUser: builder.query<UserInfo, { baseUrl: string; token: string }>({
      query: ({ baseUrl, token }) => ({
        url: `${baseUrl}${ApiEndpoint.Users}me/`,
        headers: {
          Authorization: `JWT ${token}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = userApiSlice;
