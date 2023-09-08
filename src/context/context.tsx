import { createContext } from "react";
import { ElementContext } from "../types/interfaces";

const initialContextState: ElementContext = {
  messageData: undefined,
  loading: false,
  setLoading: () => null,
  error: "",
  setError: () => null,
};

export const ElementConfigContext = createContext(initialContextState);
