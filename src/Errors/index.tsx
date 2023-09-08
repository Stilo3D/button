import { ErrorProps } from "../types/interfaces";

const ErrorMessage = ({ message }: ErrorProps) => {
  return (
    <div className="w-screen">
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full text-xl font-bold text-center">
        {message}
      </div>
    </div>
  );
};

export default ErrorMessage;
