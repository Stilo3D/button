import { Typography } from "antd";
import { useMsgDataStore } from "../../store/store";
import "./StatefulButtonWithMessage.css";
import { displayMessageAtCorrectPosition } from "./utils/utils";
import { useEffect, useState } from "react";
import { useRecordData } from "../Button/hooks/useRecordData";
import { defaultData } from "./defaults/defaultData";
import { defaultStyles } from "./defaults/defaultStyles";
import { ButtonState } from "./enums";
import Button from "../Button/button";

/**
 * Component that displays a button with a message that changes its state based on the response from the API (dependent on latching prop)
 * @returns Button with message that changes its state based on the response from the API
 */
export const StatefulButtonWithMessage = () => {
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
  const [buttonStatus, setButtonStatus] = useState<ButtonState>(
    ButtonState.Enabled
  );
  const [latched, setLatched] = useState(false);
  const { updateRecordField, getRecordFields } = useRecordData();
  const addError = useMsgDataStore((state) => state.addStoreError);

  const displayCorrectMessage = () => {
    switch (buttonStatus) {
      case ButtonState.Enabled:
        return message_enabled;
      case ButtonState.Disabled:
        return message_disabled;
      default:
        return "";
    }
  };

  const setButtonIsLatchedAndStatus = (
    isLatched: boolean,
    status: ButtonState
  ) => {
    setLatched(isLatched);
    setButtonStatus(status);
  };

  // Takes record field data and checks if the field's value is the same as the desired one + sets the button state
  const fetchDataAndSetToDisabledIfFieldValueIsTheSame = async () => {
    const res = await getRecordFields();
    if (field && res[field] !== undefined) {
      //value of the field may be e.g. false, so it is needed to check if it is not undefined
      const valuesTheSame = res[field].toString() === value;

      setButtonIsLatchedAndStatus(
        valuesTheSame,
        valuesTheSame ? ButtonState.Disabled : ButtonState.Enabled
      );
    }
  };

  // Adjusts the behavior based on the status
  const adjustButtonBehavior = (status: number) => {
    setButtonIsLatchedAndStatus(
      status === 200,
      status === 200 ? ButtonState.Disabled : ButtonState.Enabled
    );
  };

  const onClick = async () => {
    if (!field || value === undefined) {
      addError({ name: "Field Error", message: "Field or value is missing" });
      return;
    }

    //if button is latching, it should be disabled after clicking
    if (isButtonLatching) {
      setLatched(true);
      const response = await updateRecordField(field, value);
      const status = response?.status ?? 0;
      adjustButtonBehavior(status);
      return;
    }

    //if button is not latching, it is always enabled
    await updateRecordField(field, value);
  };

  useEffect(() => {
    if (!isButtonLatching) {
      return;
    }

    //load the initial state of the button (check if current value is the same as desired one) only when it is latching
    fetchDataAndSetToDisabledIfFieldValueIsTheSame();
  }, []);

  return (
    <>
      <div className={displayMessageAtCorrectPosition(message_style)}>
        <div>
          <Button
            label={label}
            width={width}
            color={color}
            height={height}
            latched={latched}
            onClicked={onClick}
          />
        </div>
        <div className="elementMessage">
          <Typography.Text>{displayCorrectMessage()}</Typography.Text>
        </div>
      </div>
    </>
  );
};
