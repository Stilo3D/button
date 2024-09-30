import { MessageData } from "../types/interfaces";
import { useMsgDataStore } from "../zustandStore/store";

export const useMessageData = () => {
  // const accessToken = USEEEEESELECTOR((state) => getAccessToken(state));
  const accessToken = useMsgDataStore(
    (state) => state.messageData?.user_details.access_token
  );
  const setAccessToken = useMsgDataStore((state) => state.setAccessToken);

  window.addEventListener("message", (event) => {
    const newMessageData: MessageData = event.data || {};

    if (newMessageData.user_details) {
      if (typeof newMessageData.user_details.access_token === "string") {
        if (newMessageData.user_details.access_token !== accessToken) {
          // DISPATTCHHHupdateAccessToken(newMessageData.user_details.access_token));
          setAccessToken(newMessageData.user_details.access_token);
        }
      }
    }
  });
};
