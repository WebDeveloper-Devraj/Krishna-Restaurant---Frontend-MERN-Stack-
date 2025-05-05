// store/slices/flashMessageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const flashMessageSlice = createSlice({
  name: "flashMessage",
  initialState: {
    message: "",
    type: "", // success, error, etc.
  },
  reducers: {
    setFlashMessage: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },

    clearFlashMessage: (state) => {
      state.message = "";
      state.type = "";
    },
  },
});

export const flashMessageActions = flashMessageSlice.actions;
export default flashMessageSlice;
