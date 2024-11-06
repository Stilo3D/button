import { MessageData } from "../types/interfaces";
import { useMsgDataStore } from "../store/store";

export const useMessageData = () => {
  const accessToken = useMsgDataStore(
    (state) => state.messageData?.user_details.access_token
  );
  const setAccessToken = useMsgDataStore((state) => state.setAccessToken);

  window.addEventListener("message", (event) => {
    const newMessageData: MessageData = event.data || {};
    const newToken = newMessageData?.user_details?.access_token;

    if (newToken && newToken !== accessToken)
      setAccessToken(newMessageData.user_details.access_token);
  });
};
