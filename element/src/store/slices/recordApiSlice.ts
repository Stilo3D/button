import { apiSlice } from "./apiSlice";
import { ApiEndpoint } from "../../types/enums";
import { ObjectRecordApi } from "../../types/interfaces";

export const recordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecordUsingQueries: builder.query<
      ObjectRecordApi,
      {
        baseUrl: string;
        query: { [prop: string]: string | number };
        token: string;
      }
    >({
      query: ({ baseUrl, query, token }) => ({
        url: `${baseUrl}${ApiEndpoint.Record}`,
        headers: {
          Authorization: `JWT ${token}`,
        },
        params: {
          ...query,
        },
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetRecordUsingQueriesQuery } = recordApiSlice;
