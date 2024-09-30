import { Alert } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/useCustomReduxHook";
import { useTheme } from "../../hooks/useTheme";
import { getErrors, removeError } from "../../store/slices/helperSlice";
import ButtonWrapper from "../Button/button";

const Element = () => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const errors = useAppSelector((state) => getErrors(state));
  return (
    <>
      <div
        className="flex w-screen h-screen justify-center items-center  px-0 md:px-12 lg:px-16 xl:px-20 2xl:px-24"
        style={{ backgroundColor: theme.background_color }}
      >
        <div className="text-center text-5xl font-bold">
          <ButtonWrapper label={"Text"} />
        </div>
        {!!errors.length && (
          <Alert
            className="w-full text-center"
            type="error"
            showIcon
            closable
            onClose={() => dispatch(removeError(errors[0]?.name))}
            message={`${errors[0]?.name}:  ${errors[0]?.message}`}
          />
        )}
      </div>
    </>
  );
};

export default Element;
