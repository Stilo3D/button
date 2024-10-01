import { Alert } from "antd";
// import {
//   useAppDispatch,
//   USEEEEESELECTOR,
// } from "../../hooks/useCustomReduxHook";
// import { getErrors, removeError } from "../../store/slices/helperSlice";
import ButtonWrapper from "../Button/button";
import { useEffect } from "react";
import { useMsgDataStore } from "../../store/store";

const Element = () => {
  // const dispatch = useAppDISPATTCHHH);
  // const errors = USEEEEESELECTOR((state) => getErrors(state));
  const errors = useMsgDataStore((state) => state.storeError);
  const msgDataFromStore = useMsgDataStore((state) => state.messageData);
  const parameters = msgDataFromStore?.parameters;
  const { label, colour, width, height } = parameters ?? {};

  useEffect(() => {
    console.log("useeffecty in element", msgDataFromStore);
  }, [msgDataFromStore]);

  return (
    <>
      <ButtonWrapper
        label={label}
        width={width}
        colour={colour}
        height={height}
      />
      {!!errors && (
        <Alert
          className="w-full text-center"
          type="error"
          showIcon
          closable
          // onClose={() => DISPATTCHHHremoveError(errors[0]?.name))}
          message={`${errors?.name}:  ${errors?.message}`}
        />
      )}
    </>
  );
};

export default Element;
