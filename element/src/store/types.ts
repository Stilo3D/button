import { MessageData } from "../types/interfaces";

export interface Store {
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
}

export interface StoreError {
  name: string;
  message: string;
}
