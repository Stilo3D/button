// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// // import { RootState } from "../store";

// interface InitialState {
//   errors: { name: string; message: string }[];
// }

// const initialState: InitialState = {
//   errors: [],
// };

// const helperSlice = createSlice({
//   name: "helperSlice",
//   initialState,
//   reducers: {
//     addError: (
//       state,
//       action: PayloadAction<{ name: string; message: string }>
//     ) => {
//       return { ...state, errors: [...state.errors, action.payload] };
//     },
//     removeError: (state, action: PayloadAction<string>) => {
//       return {
//         ...state,
//         errors: [
//           ...state.errors.filter((error) => error.name !== action.payload),
//         ],
//       };
//     },
//   },
// });

// export const getErrors = (state: RootState) => state.helper.errors;

// export const { addError, removeError } = helperSlice.actions;

// export default helperSlice.reducer;
