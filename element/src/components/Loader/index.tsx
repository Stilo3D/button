import React from "react";
import { Spin as AntSpin } from "antd";
import { SpinProps } from "antd";

const Loader: React.FC<SpinProps> = ({ ...rest }) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <AntSpin {...rest} />
    </div>
  );
};

export default Loader;
