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
  messageData,
}: StatefulButtonWithMessageProps) => {
  const parameters = messageData.parameters;
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
  const isDisabled = !messageData.object_record_meta.record_id; //If record id is not provided, set flag to true to disable the btn
  const [isLoading, setIsLoading] = useState(true);
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
    if (!isButtonLatching) {
      setIsLoading(false);
      return;
    }

    if (!messageData.object_record_meta.record_id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const res = await getRecordFields();

    //value of the field may be e.g. false, so it is needed to check if it is not undefined
    if (field && res[field] !== undefined) {
      const valuesTheSame = res[field].toString() === value;
      setLatched(valuesTheSame);
    }

    setIsLoading(false);
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
    fetchDataAndSetToDisabledIfFieldValueIsTheSame();
  }, [messageData.object_record_meta.record_id]);

  if (isLoading) {
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
