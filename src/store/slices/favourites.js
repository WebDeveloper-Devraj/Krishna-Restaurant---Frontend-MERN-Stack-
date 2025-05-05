import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dishIds: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    setFavourites: (state, action) => {
      state.dishIds = action.payload;
    },
  },
});

export const favouritesSliceActions = favouritesSlice.actions;
export default favouritesSlice;
