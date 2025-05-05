import { createSlice } from "@reduxjs/toolkit";

const scrollSlice = createSlice({
  name: "scroll",
  initialState: false,
  reducers: {
    setScrolled: (state, action) => (state = action.payload),
  },
});

export const scrollActions = scrollSlice.actions;

export default scrollSlice;
