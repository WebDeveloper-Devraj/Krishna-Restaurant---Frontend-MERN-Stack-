import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  activeCategory: "Ambiance & Interiors",
  activeSubCategory: "Photos",
  categories: [
    "Ambiance & Interiors",
    "Food & Drinks",
    "Events & Celebrations",
    "Behind the Scenes",
  ],
  subCategories: ["Photos", "Videos"],
};

const galleryCategoriesSlice = createSlice({
  name: "galleryCategories",
  initialState: initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setActiveSubCategory: (state, action) => {
      state.activeSubCategory = action.payload;
    },
  },
});

export const galleryCategoriesActions = galleryCategoriesSlice.actions;
export default galleryCategoriesSlice;
