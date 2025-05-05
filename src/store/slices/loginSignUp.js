import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

const loginSignUpSlice = createSlice({
  name: "loginSignUpUi",
  initialState: initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const loginSignUpActions = loginSignUpSlice.actions;

export default loginSignUpSlice;
