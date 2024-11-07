import { Typography } from "antd";
import { useMsgDataStore } from "../../store/store";
import "./StatefulButtonWithMessage.css";
import { displayMessageAtCorrectPosition } from "./utils/utils";
import { useEffect, useState } from "react";
import { useRecordData } from "../Button/hooks/useRecordData";
import { defaultData } from "./defaults/defaultData";
import { defaultStyles } from "./defaults/defaultStyles";
import Button from "../Button/button";
import Loader from "../Loader";
import { StatefulButtonWithMessageProps } from "./StatefulButtonWithMessage.types";

/**
 * Component that displays a button with a message that changes its state based on the response from the API (dependent on latching prop)
 * @returns Button with message that changes its state based on the response from the API
 */
export const StatefulButtonWithMessage = ({
  isDisabled,
}: StatefulButtonWithMessageProps) => {
  const messageData = useMsgDataStore((state) => state.messageData);
  const parameters = messageData?.parameters;
  const {
    label,
    color,
    width,
    height,
    field,
    value,
    message_enabled,
    message_disabled,
    message_style = defaultStyles.message_style,
  } = parameters ?? {};
  const { latching: isButtonLatching } = parameters ?? defaultData;
  const [latched, setLatched] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { updateRecordField, getRecordFields } = useRecordData();
  const addError = useMsgDataStore((state) => state.addStoreError);

  const displayCorrectMessage = () => {
    if (latched) {
      return message_disabled;
    }

    return message_enabled;
  };

  // Takes record field data and checks if the field's value is the same as the desired one + sets the button state
  const fetchDataAndSetToDisabledIfFieldValueIsTheSame = async () => {
    const res = await getRecordFields();

    //value of the field may be e.g. false, so it is needed to check if it is not undefined
    if (field && res[field] !== undefined) {
      const valuesTheSame = res[field].toString() === value;
      setLatched(valuesTheSame);
    }

    setDataLoaded(true);
  };

  const onClick = async () => {
    if (!field || value === undefined) {
      addError({ name: "Field Error", message: "Field or value is missing" });
      return;
    }

    //if button is latching, it should be disabled after clicking and enabled after the invalid response from the API
    if (isButtonLatching) {
      setLatched(true);
      const response = await updateRecordField(field, value);
      const status = response?.status ?? 0;
      setLatched(status === 200 ? true : false);
      return;
    }

    //if button is not latching, it is always enabled
    await updateRecordField(field, value);
  };

  useEffect(() => {
    //If the button is disabled, do not fetch the data
    if (isDisabled) {
      setDataLoaded(true);
      return;
    }

    if (!isButtonLatching) {
      setDataLoaded(true);
      return;
    }

    //load the initial state of the button (check if current value is the same as desired one) only when it is latching
    fetchDataAndSetToDisabledIfFieldValueIsTheSame();
  }, []);

  if (!dataLoaded) {
    return <Loader />;
  }

  return (
    <>
      <div className={displayMessageAtCorrectPosition(message_style)}>
        <div>
          <Button
            label={label}
            width={width}
            color={color}
            height={height}
            latched={isDisabled || latched}
            onClicked={onClick}
          />
        </div>
        {!isDisabled && (
          <div className="elementMessage">
            <Typography.Text>{displayCorrectMessage()}</Typography.Text>
          </div>
        )}
      </div>
    </>
  );
};
