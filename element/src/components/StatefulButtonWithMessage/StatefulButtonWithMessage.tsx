import { Typography } from "antd";
import { useMsgDataStore } from "../../store/store";
import "./StatefulButtonWithMessage.css";
import { displayMessageAtCorrectPosition } from "./utils/utils";
import { useEffect, useRef, useState } from "react";
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
    message_processing,
    message_style = defaultStyles.message_style,
  } = parameters ?? {};
  const { latching: isButtonLatching, polling_time: pollingTime } =
    parameters ?? defaultData; //set default values if do not exist
  const [buttonStatus, setButtonStatus] = useState<ButtonState>(
    ButtonState.Enabled
  );
  const [latched, setLatched] = useState(false);
  const { updateRecordField, getRecordFields } = useRecordData();
  const addError = useMsgDataStore((state) => state.addStoreError);
  const fetchStateInterval = useRef<NodeJS.Timeout | null>(null);

  const displayCorrectMessage = () => {
    switch (buttonStatus) {
      case ButtonState.Enabled:
        return message_enabled;
      case ButtonState.Processing:
        return message_processing;
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

  /**
   * Clears the interval and sets the button to disabled
   */
  const clearFetchStateInterval = () => {
    if (fetchStateInterval.current) {
      clearInterval(fetchStateInterval.current);
      setFetchStateInterval(null);
      setButtonStatus(ButtonState.Disabled);
    }
  };

  const setFetchStateInterval = (interval: NodeJS.Timeout | null) => {
    fetchStateInterval.current = interval;
  };

  /**
   * Takes record field data and checks if the field's value is the same as the desired one + sets the button state
   */
  const fetchDataAndSetCorrectState = async () => {
    const res = await getRecordFields();
    if (field && res[field] !== undefined) {
      //value of the field may be e.g. false, so it is needed to check if it is not undefined
      const valuesTheSame = res[field].toString() === value;

      if (!valuesTheSame && fetchStateInterval.current) {
        clearFetchStateInterval(); //if values are different and interval exists, clear it
      }

      setButtonIsLatchedAndStatus(
        valuesTheSame,
        fetchStateInterval.current
          ? ButtonState.Processing
          : valuesTheSame
          ? ButtonState.Disabled
          : ButtonState.Enabled
      );
    }
  };

  /**
   * Adjusts the behavior based on latching prop and request status
   * @param status - status of the changing value request
   */
  const adjustButtonBehavior = (status: number) => {
    const shouldLatch = !!isButtonLatching; //api returns data as a string so it is needed to convert it to a boolean

    if (pollingTime && !shouldLatch) {
      //if button is not latching and polling time is set
      setButtonIsLatchedAndStatus(true, ButtonState.Processing);
      setFetchStateInterval(setInterval(fetchDataAndSetCorrectState, 2000));
      setTimeout(() => {
        clearFetchStateInterval();
      }, pollingTime * 1000); //clear interval after polling time seconds
      return;
    }

    setButtonIsLatchedAndStatus(
      status === 200,
      status === 200 ? ButtonState.Disabled : ButtonState.Enabled
    ); //when latching == true the button will be disabled if the operation was successfull
  };

  const onClick = async () => {
    if (field && value !== undefined) {
      setLatched(true);
      const response = await updateRecordField(field, value);
      const status = response?.status ?? 0;
      adjustButtonBehavior(status);
    } else {
      addError({ name: "Field Error", message: "Field or value is missing" });
    }
  };

  useEffect(() => {
    fetchDataAndSetCorrectState(); //load the initial state of the button (check if current value is the same as desired one)
  }, []);

  useEffect(() => {
    console.log("efffect color", color);
  }, [color]);
  useEffect(() => {
    console.log("efffect params", parameters);
  }, [parameters]);

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
