import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { USER_NAME, USER_PASSWORD } from "../consts";
import { useMsgDataStore } from "../store/store";
import { zustandHooks } from "../store/useZustandHooks";
import { AxiosError } from "axios";

export const useGetAccessToken = () => {
  const setAccessToken = useMsgDataStore((state) => state.setAccessToken);
  const setStoreError = useMsgDataStore((state) => state.addStoreError);
  const setRefreshToken = useMsgDataStore((state) => state.setRefreshToken);
  const [tokenExpires, setTokenExpires] = useState(-1);
  const accessToken = useMsgDataStore(
    (state) => state.messageData?.user_details.access_token
  );
  const refreshToken = useMsgDataStore((state) => state.refreshToken);
  const baseUrl = useMsgDataStore((state) => state.messageData?.endpoint) ?? "";
  const { useUserLogin, userRefreshTheRefreshToken } = zustandHooks();
  const setIsLoading = useMsgDataStore((state) => state.setIsLoading);

  // the number of seconds the token is valid for
  const tokenValidFor = useMemo(() => 4.5 * 60, []);

  const handleRefreshToken = async () => {
    if (tokenExpires > -1) {
      if (dayjs().unix() > tokenExpires) {
        console.log("token expiring soon refetch new token.");
        // Refetch the token and save it into the redux
        const token = await userRefreshTheRefreshToken({
          refreshToken,
          baseUrl,
        });
        if ("access" in token) {
          setAccessToken(token.access);
          // reset the expiresIn
          setTokenExpires(dayjs().unix() + tokenValidFor);
        }
        if (token instanceof AxiosError) {
          setStoreError({
            name: token.message ?? "Refetch Token Error",
            message: token.code ?? "Failed to refresh Token",
          });
          // }
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
        setIsLoading(true);
        const token = await useUserLogin({
          data: {
            username: USER_NAME,
            password: USER_PASSWORD,
          },
          baseUrl,
        });
        if ("access" in token) {
          // set the token expiry time
          setTokenExpires(dayjs().unix() + tokenValidFor);
          setAccessToken(token.access);
          setRefreshToken(token.refresh);
        }
        setIsLoading(false);
      })();
    }
  }, [accessToken, baseUrl]);
};
