import { Button, Typography } from "antd";
import "./button.css";
import { useMsgDataStore } from "../../store/store";
import { useEffect, useState } from "react";
import { useRecordData } from "./hooks/useRecordData";
import { ButtonProps } from "./types";
import { defaultStyles } from "./defaults/defaultStyles";
import { defaultData } from "./defaults/defaultData";

const ButtonWrapper = ({
  label,
  colour,
  height,
  width,
  setButtonStatus, //used to define if button should be disabled or enabled or processing
}: ButtonProps) => {
  const messageData = useMsgDataStore((state) => state.messageData);
  const addError = useMsgDataStore((state) => state.addStoreError);
  const isButtonLatching =
    useMsgDataStore((state) => state.messageData?.parameters.latching) ??
    defaultData.isButtonLatching;
  const pollingTime =
    useMsgDataStore((state) => state.messageData?.parameters.polling_time) ??
    defaultData.pollingTime; //set default value if doesnt exist
  const field = messageData?.parameters?.field;
  const value = messageData?.parameters?.value;
  const { updateRecordField, getRecordFields } = useRecordData();
  const [latched, setLatched] = useState(false);
  let globalInterval: NodeJS.Timeout | null;

  const fetchDataAndSetCorrectState = async () => {
    //takes record fields data and checks if the field's value is the same as the desired one
    const res = await getRecordFields();
    console.log("res", res);
    console.log("field", field, "res[field]", res[field!], res[field!] !== undefined);
    if (field && res[field] !== undefined) {
      console.log("res[field]", res[field], "field", field, "value", value);
      const valuesTheSame = res[field].toString() === value;
      console.log("valuesTheSame", valuesTheSame);
      if (!valuesTheSame && globalInterval) clearGlobalInterval(); //if values are different and interval exists, clear it
      setButtonIsLatchedAndStatus(
        valuesTheSame,
        globalInterval ? -1 : valuesTheSame ? 0 : 1 //if the data are being processing, set the button to processing. Otherwise set enabled/disabled
      );
    }
  };

  const setButtonIsLatchedAndStatus = (isLatched: boolean, status: number) => {
    setLatched(isLatched);
    setButtonStatus(status);
  };

  const clearGlobalInterval = () => {
    //clears the interval and sets the button to disabled
    if (globalInterval) {
      clearInterval(globalInterval);
      globalInterval = null;
      setButtonStatus(0);
    }
  };

  const adjustButtonBehavior = (status: number) => {
    const shouldLatch = isButtonLatching.toString() === "true" ? true : false; //api returns data as a string so it is needed to convert it to a boolean
    if (pollingTime && !shouldLatch) {
      //if button is not latching and polling time is set
      setButtonIsLatchedAndStatus(true, -1); //set button to processing
      globalInterval = setInterval(fetchDataAndSetCorrectState, 2000);
      setTimeout(() => {
        clearGlobalInterval();
      }, pollingTime * 1000); //clear interval after polling time seconds
    } else setButtonIsLatchedAndStatus(status === 200, status === 200 ? 0 : 1); //when latching == true the button will be disabled if the operation was successfull
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
      fetchDataAndSetCorrectState(); //load the initial state of the button (check if current value is the same as desired one)
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
          backgroundColor: colour ?? defaultStyles.colour,
          height: height ?? defaultStyles.height,
          width: width ?? defaultStyles.width,
        }}
        onClick={() => onClick()}
        className={`buttonBasicView ${latched ? "disabledButton" : ""}`}
        disabled={latched}
      >
        <Typography.Text
          ellipsis={{
            tooltip: label ?? defaultData.label,
          }}
          className="labelEllipsis"
        >
          {label ?? defaultData.label}
        </Typography.Text>
      </Button>
    </div>
  );
};

export default ButtonWrapper;
