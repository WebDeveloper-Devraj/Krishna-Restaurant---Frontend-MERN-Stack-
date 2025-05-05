import { createSlice } from "@reduxjs/toolkit";

const authoriseSlice = createSlice({
  name: "authorise",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const authoriseActions = authoriseSlice.actions;
export default authoriseSlice;
