// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// // import { RootState } from "../store";
// import { MessageData } from "../../types/interfaces";

// const initialState: MessageData = {
//   user_details: {
//     access_token: "",
//     first_name: "",
//     last_name: "",
//     user_id: 0,
//     user_name: "",
//   },
//   object_record_meta: {
//     class_id: undefined,
//     record_id: undefined,
//   },
//   endpoint: "",
//   component_parameters: [],
//   parameters: {},
// };

// const messageDataSlice = createSlice({
//   name: "messageData",
//   initialState,
//   reducers: {
//     populateMessageData: (_state, action: PayloadAction<MessageData>) => {
//       return { ...action.payload };
//     },
//     updateAccessToken: (state, action: PayloadAction<string>) => {
//       state.user_details.access_token = action.payload;
//     },
//   },
// });

// export const getAccessToken = (state: RootState) =>
//   state.messageData.user_details.access_token;

// export const getBaseUrl = (state: RootState) => state.messageData.endpoint;

// export const getParameters = (state: RootState) => state.messageData.parameters;

// export const getMetaData = (state: RootState) =>
//   state.messageData.object_record_meta;

// export const { populateMessageData, updateAccessToken } =
//   messageDataSlice.actions;

// export default messageDataSlice.reducer;
