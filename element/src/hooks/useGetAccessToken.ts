import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useCustomReduxHook";
import dayjs from "dayjs";
import { USER_NAME, USER_PASSWORD } from "../consts";
import {
  getAccessToken,
  getBaseUrl,
  updateAccessToken,
} from "../store/slices/messageDataSlice";
import {
  useRefreshTokenMutation,
  useLoginMutation,
} from "../store/slices/usersApiSlice";
import { getRefreshToken, updateRefreshToken } from "../store/slices/authSlice";
import { addError } from "../store/slices/helperSlice";

export const useGetAccessToken = () => {
  const dispatch = useAppDispatch();
  const [tokenExpires, setTokenExpires] = useState(-1);

  const accessToken = useAppSelector((state) => getAccessToken(state));
  const baseUrl = useAppSelector((state) => getBaseUrl(state));
  const refreshToken = useAppSelector((state) => getRefreshToken(state));

  const [login, { isLoading, error }] = useLoginMutation();
  const [getNewToken] = useRefreshTokenMutation();

  // the number of seconds the token is valid for
  const tokenValidFor = useMemo(() => 4.5 * 60, []);

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

  const handleRefreshToken = async () => {
    if (tokenExpires > -1) {
      if (dayjs().unix() > tokenExpires) {
        console.log("token expiring soon refetch new token.");
        // Refetch the token and save it into the redux
        const token = await getNewToken({ refreshToken, baseUrl });
        if (!("error" in token)) {
          dispatch(updateAccessToken(token.data.access));
          // reset the expiresIn
          setTokenExpires(dayjs().unix() + tokenValidFor);
        }
        if ("error" in token) {
          if ("status" in token.error) {
            // set error alert
            dispatch(
              addError({
                name: "Refetch Token Error",
                message: token.error.status.toString(),
              })
            );
          } else {
            dispatch(
              addError({
                name: "Refetch Token Error",
                message: token.error.message || "Failed to refresh Token",
              })
            );
          }
          setTokenExpires(-1);
        }
      }
    }
  };

  useEffect(() => {
    const checkTokenExpire = setInterval(handleRefreshToken, 5000);
    return () => {
      clearInterval(checkTokenExpire);
    };
  }, [tokenExpires]);

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
          // set the token expiry time
          setTokenExpires(dayjs().unix() + tokenValidFor);
          dispatch(updateAccessToken(token.access));
          dispatch(updateRefreshToken(token.refresh));
        }
      })();
    }
  }, [accessToken, USER_NAME, USER_PASSWORD, baseUrl]);
  return { isLoading, error, errorMessage };
};
