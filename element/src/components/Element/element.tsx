import { Typography } from "antd";
import ButtonWrapper from "../Button/button";
import { useMsgDataStore } from "../../store/store";
import "./element.css";
import { displayMessageAtCorrectPosition } from "./utils/utils";
import { useState } from "react";
import { defaultData } from "./defaults/defaultData";

export const Element = () => {
  const msgDataFromStore = useMsgDataStore((state) => state.messageData);
  const parameters = msgDataFromStore?.parameters;
  const { label, colour, width, height } = parameters ?? {};
  const {
    message_enabled,
    message_disabled,
    message_processing,
    message_style = defaultData.message_style,
  } = parameters ?? {};
  const [buttonStatus, setButtonStatus] = useState<number>(1); //1 enabled, 0 disabled, -1 processing
  // const [message, setMessage] = useState<string>("");

  const loadMessage = () => {
    if (message_disabled && message_processing && message_enabled)
      switch (buttonStatus) {
        case 1:
          console.log("case 1");
          return message_enabled;

        case -1:
          console.log("case -1");

          return message_processing;
        case 0:
          console.log("case 0");

          return message_disabled;
        default:
          console.log("case def");

          return "";
      }
  };

  // useEffect(() => {
  //   loadMessage();
  // }, [message_disabled, message_processing, message_enabled, buttonStatus]);

  return (
    <>
      <div className={displayMessageAtCorrectPosition(message_style)}>
        <div>
          <ButtonWrapper
            label={label}
            width={width}
            colour={colour}
            height={height}
            setButtonStatus={setButtonStatus}
          />
        </div>
        <div className="elementMessage">
          <Typography.Text>{loadMessage()}</Typography.Text>
        </div>
      </div>
    </>
  );
};
