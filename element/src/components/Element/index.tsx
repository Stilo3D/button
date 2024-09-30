import { Alert } from "antd";
// import {
//   useAppDispatch,
//   USEEEEESELECTOR,
// } from "../../hooks/useCustomReduxHook";
// import { getErrors, removeError } from "../../store/slices/helperSlice";
import ButtonWrapper from "../Button/button";
import { useEffect } from "react";
import { useMsgDataStore } from "../../zustandStore/store";

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
      {!!errors.length && (
        <Alert
          className="w-full text-center"
          type="error"
          showIcon
          closable
          // onClose={() => DISPATTCHHHremoveError(errors[0]?.name))}
          message={`${errors[0]?.name}:  ${errors[0]?.message}`}
        />
      )}
    </>
  );
};

export default Element;
