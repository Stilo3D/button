import { Button } from "antd";
import "./button.css";

type ButtonProps = {
  label?: string;
  color?: string;
};

const ButtonWrapper = ({ label, color }: ButtonProps) => {
  return (
    <Button
      type="primary"
      style={{ backgroundColor: color ? color : "#33b1e9", fontWeight: "bold" }}
      className="buttonBasicView"
    >
      {label ? label : "Button"}
    </Button>
  );
};

export default ButtonWrapper;
