import { useEffect, useMemo, useState } from "react";
// import { useAppDispatch, USEEEEESELECTOR } from "./useCustomReduxHook";
import dayjs from "dayjs";
import { USER_NAME, USER_PASSWORD } from "../consts";
// import {
//   getAccessToken,
//   getBaseUrl,
//   updateAccessToken,
// } from "../store/slices/messageDataSlice";
// import {
//   useRefreshTokenMutation,
//   useLoginMutation,
// } from "../store/slices/usersApiSlice";
// import { getRefreshToken } from "../store/slices/authSlice";
// import { addError } from "../store/slices/helperSlice";
import { useMsgDataStore } from "../zustandStore/store";
import { zustandHooks } from "../zustandStore/useZustandHooks";

export const useGetAccessToken = () => {
  // const dispatch = useAppDISPATTCHHH);
  const setAccessToken = useMsgDataStore((state) => state.setAccessToken);
  const setStoreError = useMsgDataStore((state) => state.setStoreError);
  const setRefreshToken = useMsgDataStore((state) => state.setRefreshToken);
  const [tokenExpires, setTokenExpires] = useState(-1);

  // const accessToken = USEEEEESELECTOR((state) => getAccessToken(state));
  // const baseUrl = USEEEEESELECTOR((state) => getBaseUrl(state));
  // const refreshToken = USEEEEESELECTOR((state) => getRefreshToken(state));
  const accessToken = useMsgDataStore(
    (state) => state.messageData?.user_details.access_token
  );
  const refreshToken = useMsgDataStore((state) => state.refreshToken);
  const baseUrl = useMsgDataStore((state) => state.messageData?.endpoint) ?? "";

  // const [login, { isLoading, error }] = useLoginMutation();
  // const [getNewToken] = useRefreshTokenMutation();
  const hooks = zustandHooks();

  // the number of seconds the token is valid for
  const tokenValidFor = useMemo(() => 4.5 * 60, []);

  const errorMessage = useMemo(() => {
    let message = "Failed to get access token when in development.";
    // const err = error as { data: { [prop: string]: string } } | undefined;
    // if (err?.data) {
    //   for (const key in err.data) {
    //     if (key === "detail") {
    //       message = `${key} - ${err.data[key]}`;
    //       break;
    //     } else {
    //       message = `${key} - ${err.data[key]}`;
    //     }
    //   }
    // }
    return message;
  }, []);

  const handleRefreshToken = async () => {
    if (tokenExpires > -1) {
      if (dayjs().unix() > tokenExpires) {
        console.log("token expiring soon refetch new token.");
        // Refetch the token and save it into the redux
        // const token = await getNewToken({ refreshToken, baseUrl });
        const token = await hooks.userRefreshTheRefreshToken({
          refreshToken,
          baseUrl,
        });
        if ("access" in token) {
          setAccessToken(token.access);
          // reset the expiresIn
          setTokenExpires(dayjs().unix() + tokenValidFor);
        }
        if ("error" in token) {
          if (token.error) {
            // set error alert
            // DISPATTCHHH
            //   addError({
            //     name: "Refetch Token Error",
            //     message: token.error.status.toString(),
            //   })
            // );
            setStoreError({
              name: "Refetch Token Error",
              message: token.error.toString(),
            });
          } else {
            setStoreError({
              name: "Refetch Token Error",
              message: token.error || "Failed to refresh Token",
            });
            // DISPATTCHHH
            //   addError({
            //     name: "Refetch Token Error",
            //     message: token.error.message || "Failed to refresh Token",
            //   })
            // );
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
        const token = await hooks.useUserLogin({
          data: {
            username: USER_NAME,
            password: USER_PASSWORD,
          },
          baseUrl,
        });
        if ("access" in token) {
          // set the token expiry time
          setTokenExpires(dayjs().unix() + tokenValidFor);
          // DISPATTCHHHupdateAccessToken(token.access));
          setAccessToken(token.access);
          setRefreshToken(token.refresh);
          // DISPATTCHHHupdateRefreshToken(token.refresh));
        }
      })();
    }
  }, [accessToken, USER_NAME, USER_PASSWORD, baseUrl]);
  return { isLoading: false, error: "", errorMessage };
};
