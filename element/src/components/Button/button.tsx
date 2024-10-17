import { Button as AntdButton, Typography } from "antd";
import "./button.css";
import { ButtonProps } from "./types";
import { defaultStyles } from "./defaults/defaultStyles";
import { defaultData } from "../StatefulButtonWithMessage/defaults/defaultData";
import clsx from "clsx/lite";

const Button = ({
  label,
  color,
  height,
  width,
  onClicked,
  latched,
}: ButtonProps) => {
  return (
    <div className="buttonContainer">
      <AntdButton
        type="primary"
        style={{
          backgroundColor: color || defaultStyles.color,
          height: height || defaultStyles.height,
          width: width || defaultStyles.width,
        }}
        onClick={onClicked}
        className={clsx("buttonBasicView", latched && "disabledButton")}
        disabled={latched}
      >
        <Typography.Text
          ellipsis={{
            tooltip: label || defaultData.label,
          }}
          className="labelEllipsis"
        >
          {label || defaultData.label}
        </Typography.Text>
      </AntdButton>
    </div>
  );
};

export default Button;
