import { create } from "zustand";
import { MessageData } from "../types/interfaces";
import { produce } from "immer";

type Store = {
  messageData: MessageData | null;
  storeError: StoreError[];
  refreshToken: string;
  setMessageData: (newMsgData: MessageData | null) => void;
  setStoreError: (newMsgData: StoreError) => void;
  setAccessToken: (newToken: string) => void;
  setRefreshToken: (newToken: string) => void;
  removeStoreError: (errorName: string) => void;
};

interface StoreError {
  name: string;
  message: string;
}

export const useMsgDataStore = create<Store>((set) => ({
  messageData: null,
  storeError: [],
  refreshToken: "",
  setMessageData: (newMsgData: MessageData | null) =>
    set({ messageData: newMsgData }),
  setStoreError: (newError: StoreError) =>
    set((state: Store) => ({
      ...state,
      storeError: [...state.storeError, newError],
    })),
  setAccessToken: (newToken: string) =>
    set(
      produce((state: Store) => {
        if (state.messageData?.user_details)
          state.messageData.user_details.access_token = newToken;
      })
    ),
  removeStoreError: (errorName: string) =>
    set((state: Store) => ({
      ...state,
      storeError: state.storeError.filter((error) => error.name !== errorName),
    })),
  setRefreshToken: (newToken: string) => set({ refreshToken: newToken }),
}));
