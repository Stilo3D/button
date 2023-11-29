import { apiSlice } from "./apiSlice";
import { ApiEndpoint } from "../../types/enums";
import { ObjectRecordApi } from "../../types/interfaces";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasksUsingQueries: builder.query<
      ObjectRecordApi,
      {
        baseUrl: string;
        query: { [prop: string]: string | number };
        token: string;
      }
    >({
      query: ({ baseUrl, query, token }) => ({
        url: `${baseUrl}${ApiEndpoint.Tasks}`,
        headers: {
          Authorization: `JWT ${token}`,
        },
        params: {
          ...query,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetTasksUsingQueriesQuery } = taskApiSlice;
