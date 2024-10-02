import { Button, Typography } from "antd";
import "./button.css";
import { useMsgDataStore } from "../../store/store";
import { useEffect, useState } from "react";
import { useUpdateRecordData } from "./hooks/useUpdateRecordField";
import { useGetRecordData } from "./hooks/usetGetRecordData";

type ButtonProps = {
  label?: string;
  colour?: string;
  width?: string;
  height?: string;
  setButtonStatus: (status: number) => void;
};

const ButtonWrapper = ({
  label,
  colour,
  height,
  width,
  setButtonStatus,
}: ButtonProps) => {
  const messageData = useMsgDataStore((state) => state.messageData);
  const addError = useMsgDataStore((state) => state.addStoreError);
  const isButtonLatching =
    useMsgDataStore((state) => state.messageData?.parameters.latching) ?? true;
  const pollingTime =
    useMsgDataStore((state) => state.messageData?.parameters.polling_time) ??
    10; //set default value if doesnt exist
  const field = messageData?.parameters?.field;
  const value = messageData?.parameters?.value;
  const { updateRecordField } = useUpdateRecordData();
  const [latched, setLatched] = useState(false);
  const { getRecordFields } = useGetRecordData();
  let globalInterval: NodeJS.Timeout | null;

  const fetchAndSetInitialState = async () => {
    const res = await getRecordFields();
    if (field) {
      const valuesTheSame = res[field].toString() === value;

      if (!valuesTheSame) clearGlobalInterval();
      setButtonIsLatchedAndStatus(
        valuesTheSame,
        globalInterval ? -1 : valuesTheSame ? 0 : 1 //if the data are processing, set the button to processing. Otherwise set enabled/disabled
      );
    }
  };

  const setButtonIsLatchedAndStatus = (isLatched: boolean, status: number) => {
    setLatched(isLatched);
    setButtonStatus(status);
  };

  const clearGlobalInterval = () => {
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
      globalInterval = setInterval(fetchAndSetInitialState, 2000);
      setTimeout(() => {
        clearGlobalInterval();
      }, pollingTime * 1000);
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
    </div>
  );
};

export default ButtonWrapper;
