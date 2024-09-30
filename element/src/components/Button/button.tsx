import { Button, Typography } from "antd";
import "./button.css";
import { useMsgDataStore } from "../../store/store";
import { useUpdateRecordData } from "../../hooks/useUpdateRecordField";

type ButtonProps = {
  label?: string;
  colour?: string;
  width?: string;
  height?: string;
};

const ButtonWrapper = ({ label, colour, height, width }: ButtonProps) => {
  const state = useMsgDataStore((state) => state);
  const messageData = useMsgDataStore((state) => state.messageData);
  const addError = useMsgDataStore((state) => state.addStoreError);
  const field = messageData?.parameters?.field;
  const value = messageData?.parameters?.value;
  const { updateRecordField } = useUpdateRecordData();

  const onClick = () => {
    console.log("Button Clicked", state);
    if (field && value) updateRecordField(field, value);
    else
      addError({ name: "Field Error", message: "Field or Value is missing" });
  };

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
        className="buttonBasicView"
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
