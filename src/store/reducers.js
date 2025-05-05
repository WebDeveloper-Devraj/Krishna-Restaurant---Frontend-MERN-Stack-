import { combineReducers } from "@reduxjs/toolkit";
import scrollSlice from "./slices/scroll";
import loginSignUpSlice from "./slices/loginSignUp";
import menuCategoriesSlice from "./slices/menuCategories";
import galleryCategoriesSlice from "./slices/galleryCategories";
import cartSlice from "./slices/cart";
import authoriseSlice from "./slices/authorise";
import flashMessageSlice from "./slices/flashMessage";
import orderSlice from "./slices/order";
import favouritesSlice from "./slices/favourites";

const rootReducer = combineReducers({
  scroll: scrollSlice.reducer,
  loginSignUpUi: loginSignUpSlice.reducer,
  menuCategories: menuCategoriesSlice.reducer,
  galleryCategories: galleryCategoriesSlice.reducer,
  cart: cartSlice.reducer,
  authorise: authoriseSlice.reducer,
  flashMessage: flashMessageSlice.reducer,
  order: orderSlice.reducer,
  favourites: favouritesSlice.reducer,
});

export default rootReducer;
