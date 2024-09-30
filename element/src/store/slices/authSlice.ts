// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// // import { RootState } from "../store";
// import { UserInfo } from "../../types/interfaces";

// const initialState: { userInfo: UserInfo | null; refreshToken: string } = {
//   userInfo: null,
//   refreshToken: "",
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     populateUser: (state, action: PayloadAction<UserInfo>) => {
//       return {
//         ...state,
//         userInfo: action.payload,
//       };
//     },
//     updateRefreshToken: (state, action: PayloadAction<string>) => {
//       return {
//         ...state,
//         refreshToken: action.payload,
//       };
//     },
//   },
// });

// export const getUserInfo = (state: RootState) => state.auth.userInfo;
// export const getUserRoles = (state: RootState) => state.auth.userInfo?.roles;
// export const getUserAccountType = (state: RootState) =>
//   state.auth.userInfo?.account_type;
// export const getUserId = (state: RootState) => state.auth.userInfo?.id;
// export const getRefreshToken = (state: RootState) => state.auth.refreshToken;

// export const { populateUser, updateRefreshToken } = authSlice.actions;

// export default authSlice.reducer;
