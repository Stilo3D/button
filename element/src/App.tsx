import { useMessageData } from "./hooks/useMessageData";
import { MessageData } from "./types/interfaces";
import { useEffect } from "react";
import { useGetAccessToken } from "./hooks/useGetAccessToken";
import Loader from "./components/Loader";
import { Alert } from "antd";
import { useMsgDataStore } from "./store/store";
import { Element } from "./components/Element/element";

const App = ({ messageData }: { messageData: MessageData }) => {
  const setMessageData = useMsgDataStore((state) => state.setMessageData);
  const storeErrors = useMsgDataStore((state) => state.storeError);
  const isLoading = useMsgDataStore((state) => state.isLoading);

  useEffect(() => {
    if (messageData) {
      setMessageData(messageData);
    }
  }, [messageData]);

  useMessageData();
  useGetAccessToken(); // used to updated the access token when re passed into the iframe window.

  if (storeErrors) return <Alert message={storeErrors.message}></Alert>;
  if (isLoading) return <Loader />;
  return <Element />;
};

export default App;
