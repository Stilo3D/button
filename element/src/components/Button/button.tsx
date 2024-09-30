import { Button, Typography } from "antd";
import "./button.css";
import { useMsgDataStore } from "../../zustandStore/store";

type ButtonProps = {
  label?: string;
  colour?: string;
  width?: string;
  height?: string;
};

const ButtonWrapper = ({ label, colour, height, width }: ButtonProps) => {
  const state = useMsgDataStore((state) => state);

  const onClick = () => {
    console.log("Button Clicked", state);
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
        onClick={onClick}
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
