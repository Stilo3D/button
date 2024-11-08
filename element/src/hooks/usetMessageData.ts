import { useEffect } from "react";
import { useMsgDataStore } from "../store/store";
import { reinitializeAxiosConfig } from "../setups/axios/axiosInstance";

export const useMessageData = () => {
  const messageData = useMsgDataStore((state) => state.messageData);
  const setIsLoading = useMsgDataStore((state) => state.setIsLoading);

  /**
   * When the app is run in prod mode, set up prod axios config and stop loading
   */
  useEffect(() => {
    console.log("messageData changed in use hook", messageData);
    if (process.env.NODE_ENV !== "development" && messageData) {
      console.log("reinitialize axios config");
      reinitializeAxiosConfig(
        messageData.user_details.access_token,
        messageData.endpoint
      );
      setIsLoading(false);
    }
  }, [messageData?.user_details.access_token, messageData?.endpoint]);
};
