import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./useCustomReduxHook";
import { USER_NAME, USER_PASSWORD } from "../consts";
import {
  getAccessToken,
  getBaseUrl,
  updateAccessToken,
} from "../store/slices/messageDataSlice";
import { useLoginMutation } from "../store/slices/usersApiSlice";

export const useGetAccessToken = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => getAccessToken(state));
  const baseUrl = useAppSelector((state) => getBaseUrl(state));

  const [login, { isLoading, error }] = useLoginMutation();

  const errorMessage = useMemo(() => {
    let message = "Failed to get access token when in development.";
    const err = error as { data: { [prop: string]: string } } | undefined;
    if (err?.data) {
      for (const key in err.data) {
        if (key === "detail") {
          message = `${key} - ${err.data[key]}`;
          break;
        } else {
          message = `${key} - ${err.data[key]}`;
        }
      }
    }
    return message;
  }, [error]);

  useEffect(() => {
    if (
      !accessToken &&
      process.env.NODE_ENV === "development" &&
      USER_NAME &&
      USER_PASSWORD &&
      baseUrl
    ) {
      (async () => {
        const token = await login({
          data: {
            username: USER_NAME,
            password: USER_PASSWORD,
          },
          baseUrl,
        }).unwrap();
        if ("access" in token) {
          dispatch(updateAccessToken(token.access));
        }
      })();
    }
  }, [accessToken, USER_NAME, USER_PASSWORD, baseUrl]);
  return { isLoading, error, errorMessage };
};
