import {
  getAccessToken,
  updateAccessToken,
} from "../store/slices/messageDataSlice";
import { MessageData } from "../types/interfaces";
import { useAppDispatch, useAppSelector } from "./useCustomReduxHook";

export const useMessageData = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => getAccessToken(state));

  window.addEventListener("message", (event) => {
    const newMessageData: MessageData = event.data || {};

    if (newMessageData.user_details) {
      if (typeof newMessageData.user_details.access_token === "string") {
        if (newMessageData.user_details.access_token !== accessToken) {
          dispatch(updateAccessToken(newMessageData.user_details.access_token));
        }
      }
    }
  });
};
