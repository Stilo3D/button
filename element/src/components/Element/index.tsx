import { useTheme } from "../../hooks/useTheme";

const Element = () => {
  const { theme } = useTheme();
  return (
    <>
      <div
        className="flex w-screen h-screen justify-center items-center  px-0 md:px-12 lg:px-16 xl:px-20 2xl:px-24"
        style={{ backgroundColor: theme.background_color }}
      >
        <div className="text-center text-5xl font-bold">Your Element Here!</div>
      </div>
    </>
  );
};

export default Element;
