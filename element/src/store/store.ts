import { create } from "zustand";
import { MessageData } from "../types/interfaces";
import { produce } from "immer";
import { Store, StoreError } from "./types";

export const useMsgDataStore = create<Store>((set) => ({
  messageData: null,
  storeError: null,
  refreshToken: "",
  isLoading: true,
  setMessageData: (newMsgData: MessageData | null) =>
    set({ messageData: newMsgData }),
  addStoreError: (newError: StoreError) =>
    set(() => ({
      storeError: newError,
    })),
  setAccessToken: (newToken: string) =>
    set(
      produce((state: Store) => {
        //used immer to simplify changing specific property of the state
        if (state.messageData?.user_details) {
          state.messageData.user_details.access_token = newToken;
        }
      })
    ),
  resetErrors: () => set(() => ({ storeError: null })),
  setRefreshToken: (newToken: string) => set({ refreshToken: newToken }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
}));
