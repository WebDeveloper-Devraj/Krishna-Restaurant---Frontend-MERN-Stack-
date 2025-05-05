import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: "All",
  categories: ["All", "Starters", "Main Course", "Desserts", "Beverages"],
  dishes: [],
};

const menuCategoriesSlice = createSlice({
  name: "menuCategories",
  initialState: initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },

    setDishes: (state, action) => {
      state.dishes = action.payload;
    },
  },
});

export const menuCategoriesActions = menuCategoriesSlice.actions;
export default menuCategoriesSlice;
