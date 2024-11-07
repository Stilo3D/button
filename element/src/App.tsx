import { MessageData } from "./types/interfaces";
import { useEffect } from "react";
import Loader from "./components/Loader";
import { Alert } from "antd";
import { useMsgDataStore } from "./store/store";
import { StatefulButtonWithMessage } from "./components/StatefulButtonWithMessage/StatefulButtonWithMessage";
import { useMessageDataAccessTokenListener } from "./hooks/useMessageDataAccessTokenListener";
import { useUserLogin } from "./hooks/useUserLogin";

const App = ({ messageData }: { messageData: MessageData }) => {
  const setMessageData = useMsgDataStore((state) => state.setMessageData);
  const storeErrors = useMsgDataStore((state) => state.storeError);
  const isLoading = useMsgDataStore((state) => state.isLoading) ?? true;
  const recordId = useMsgDataStore(
    (state) => state.messageData?.object_record_meta.record_id
  );

  useEffect(() => {
    setMessageData(messageData);
  }, [messageData, setMessageData]);

  useMessageDataAccessTokenListener();
  useUserLogin(messageData); // used to updated the access token when re passed into the iframe window.

  //Hide the element when opened in create mode
  if (!recordId) {
    return <StatefulButtonWithMessage disabled={true} />;
  }

  if (storeErrors) {
    return <Alert message={storeErrors.message}></Alert>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return <StatefulButtonWithMessage />;
};

export default App;
