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

export const { useLoginMutation, useGetUserQuery } = userApiSlice;
