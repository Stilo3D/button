import { useMessageData } from "./hooks/useMessageData";
import Element from "./components/Element";
import { MessageData } from "./types/interfaces";
// import { useAppDispatch } from "./hooks/useCustomReduxHook";
import { createContext, useEffect } from "react";
// import { populateMessageData } from "./store/slices/messageDataSlice";
import { useGetAccessToken } from "./hooks/useGetAccessToken";
import Loader from "./components/Loader";
import { Alert } from "antd";
import { useMsgDataStore } from "./zustandStore/store";

export const MsgDataContext = createContext<MessageData | null>(null);

function App({ messageData }: { messageData: MessageData }) {
  // const dispatch = useAppDISPATTCHHH);
  // const [msgData, setMsgData] = useState<MessageData | null>(null);
  const setMessageData = useMsgDataStore((state) => state.setMessageData);

  useEffect(() => {
    if (messageData) {
      // DISPATTCHHHpopulateMessageData(messageData));
      setMessageData(messageData);
    }
  }, [messageData]);

  // used to updated teh access token when re passed into the iframe window.
  useMessageData();
  const { isLoading, error, errorMessage } = useGetAccessToken();

  if (error) return <Alert message={errorMessage}></Alert>;
  if (isLoading) return <Loader />;
  return <Element />;
}

export default App;
