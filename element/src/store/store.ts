import { create } from "zustand";
import { MessageData } from "../types/interfaces";
import { produce } from "immer";

type Store = {
  messageData: MessageData | null;
  storeError: StoreError | null;
  refreshToken: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setMessageData: (newMsgData: MessageData | null) => void;
  addStoreError: (newMsgData: StoreError) => void;
  setAccessToken: (newToken: string) => void;
  setRefreshToken: (newToken: string) => void;
  resetErrors: () => void;
};

interface StoreError {
  name: string;
  message: string;
}

export const useMsgDataStore = create<Store>((set) => ({
  messageData: null,
  storeError: null,
  refreshToken: "",
  isLoading: false,
  setMessageData: (newMsgData: MessageData | null) =>
    set({ messageData: newMsgData }),
  addStoreError: (newError: StoreError) =>
    set(() => ({
      storeError: newError,
    })),
  setAccessToken: (newToken: string) =>
    set(
      produce((state: Store) => {
        if (state.messageData?.user_details)
          state.messageData.user_details.access_token = newToken;
      })
    ),
  resetErrors: () => set(() => ({ storeError: null })),
  setRefreshToken: (newToken: string) => set({ refreshToken: newToken }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
}));
