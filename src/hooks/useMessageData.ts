import { useState } from "react";
import { MessageData } from "../types/interfaces";

export const useMessageData = () => {
  const [messageData, setMessageData] = useState<MessageData | undefined>();

  window.addEventListener("message", (event) => {
    const messageData: MessageData = event.data || {};
    if (messageData.user_details) setMessageData(messageData);
  });

  return {
    messageData,
  };
};
