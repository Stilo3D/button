import { Button, Typography } from "antd";
import "./button.css";
import { useMsgDataStore } from "../../store/store";
import { useEffect, useRef, useState } from "react";
import { useUpdateRecordData } from "./hooks/useUpdateRecordField";
import { useGetRecordData } from "./hooks/usetGetRecordData";
import { AxiosError } from "axios";

type ButtonProps = {
  label?: string;
  colour?: string;
  width?: string;
  height?: string;
};

const ButtonWrapper = ({ label, colour, height, width }: ButtonProps) => {
  const messageData = useMsgDataStore((state) => state.messageData);
  const addError = useMsgDataStore((state) => state.addStoreError);
  const isButtonLatching =
    useMsgDataStore((state) => state.messageData?.parameters.latching) ?? true;
  const pollingTime =
    useMsgDataStore((state) => state.messageData?.parameters.polling_time) ??
    10; //set default value if doesnt exist
  const field = messageData?.parameters?.field;
  const value = messageData?.parameters?.value;
  const message_enabled = messageData?.parameters?.message_enabled;
  const { updateRecordField } = useUpdateRecordData();
  const [latched, setLatched] = useState(false);
  const { getRecordFields } = useGetRecordData();
  var globalInterval: NodeJS.Timeout | null;

  const fetchAndSetInitialState = async () => {
    const res = await getRecordFields();
    if (field) {
      const valuesTheSame = res[field].toString() === value;
      if (valuesTheSame) setLatched(valuesTheSame);
      //if the field value is the same as the value passed in the button will be disabled
      else {
        setLatched(valuesTheSame);
        clearGlobalInterval();
      }
    }
  };

  const clearGlobalInterval = () => {
    if (globalInterval) {
      clearInterval(globalInterval);
      globalInterval = null;
    }
  };

  const adjustButtonBehavior = (status: number) => {
    const shouldLatch = isButtonLatching.toString() === "true" ? true : false; //api returns data as a string so it is needed to convert it to a boolean
    if (pollingTime && !shouldLatch) {
      globalInterval = setInterval(fetchAndSetInitialState, 2000);
      setTimeout(() => {
        clearGlobalInterval();
      }, pollingTime * 1000);
    } else setLatched(status === 200); //when latching == true the button will be disabled if the operation was successfull
  };

  const onClick = async () => {
    if (field && value !== undefined) {
      setLatched(true);
      const { status } = await updateRecordField(field, value);
      adjustButtonBehavior(status);
    } else
      addError({ name: "Field Error", message: "Field or Value is missing" });
  };

  useEffect(() => {
    if (
      messageData?.endpoint &&
      messageData.object_record_meta.record_id &&
      messageData.user_details.access_token
    ) {
      fetchAndSetInitialState(); //load the initial state of the button (check if current value is the same as desired one)
    }
  }, [
    messageData?.object_record_meta.record_id,
    messageData?.endpoint,
    messageData?.user_details.access_token,
  ]);

  return (
    <div className="buttonContainer">
      <Button
        type="primary"
        style={{
          backgroundColor: colour ?? "#028fdf",
          height: height ?? "30px",
          width: width ?? "80px",
        }}
        onClick={() => onClick()}
        className={`buttonBasicView ${latched ? "disabledButton" : ""}`}
        disabled={latched}
      >
        <Typography.Text
          ellipsis={{
            tooltip: label ?? "Button",
          }}
          className="labelEllipsis"
        >
          {label ?? "Button"}
        </Typography.Text>
      </Button>
      <Typography.Text>{message_enabled}</Typography.Text>
    </div>
  );
};

export default ButtonWrapper;
