import Loader from "../Loader";
import { useFetchData } from "../../hooks/useFetchData";

const Element = () => {
  const { loading } = useFetchData();

  if (loading) return <Loader size="large" />;
  return (
    <>
      <h1 className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full text-xl font-bold text-center">
        Element Component
      </h1>
    </>
  );
};

export default Element;
