import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { UserInfo } from "../../types/interfaces";

const initialState: { userInfo: UserInfo | null } = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    populateUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
  },
});

export const getUserInfo = (state: RootState) => state.auth.userInfo;
export const getUserRoles = (state: RootState) => state.auth.userInfo?.roles;
export const getUserAccountType = (state: RootState) =>
  state.auth.userInfo?.account_type;
export const getUserId = (state: RootState) => state.auth.userInfo?.id;

export const { populateUser } = authSlice.actions;

export default authSlice.reducer;
