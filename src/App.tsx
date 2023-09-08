import { useState } from "react";
import { useMessageData } from "./hooks/useMessageData";
import ErrorMessage from "./Errors";
import { ElementConfigContext } from "./context/context";
import Element from "./components/Element";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { messageData } = useMessageData();

  if (error) return <ErrorMessage message={error} />;

  return (
    <ElementConfigContext.Provider
      value={{ messageData, loading, setLoading, error, setError }}
    >
      <Element />
    </ElementConfigContext.Provider>
  );
}

export default App;
