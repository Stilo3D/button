import { MessageData } from "./types/interfaces";
import { useEffect } from "react";
import Loader from "./components/Loader";
import { Alert } from "antd";
import { useMsgDataStore } from "./store/store";
import { StatefulButtonWithMessage } from "./components/StatefulButtonWithMessage/StatefulButtonWithMessage";
import { useMessageDataAccessTokenListener } from "./hooks/useMessageDataAccessTokenListener";
import { useUserLogin } from "./hooks/useUserLogin";
import { useMessageData } from "./hooks/usetMessageData";

const App = ({ messageData }: { messageData: MessageData }) => {
  const setMessageData = useMsgDataStore((state) => state.setMessageData);
  const storeErrors = useMsgDataStore((state) => state.storeError);
  const isLoading = useMsgDataStore((state) => state.isLoading) ?? true;

  useEffect(() => {
    console.log("messageData changed", messageData);
    setMessageData(messageData);
  }, [messageData]);

  useMessageDataAccessTokenListener();
  useUserLogin(); // used to updated the access token when re passed into the iframe window.
  useMessageData(); // used to updated the access token when re passed into the iframe window.

  if (storeErrors) {
    return <Alert message={storeErrors.message}></Alert>;
  }

  if (isLoading || !messageData) {
    return <Loader />;
  }

  return <StatefulButtonWithMessage messageData={messageData} />;
};

export default App;
