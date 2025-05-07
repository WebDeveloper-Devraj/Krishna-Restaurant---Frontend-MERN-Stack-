import { createSlice } from "@reduxjs/toolkit";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const loadCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem("items");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

export const saveCartToLocalStorage = (items) => {
  localStorage.setItem("items", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload; // Update items array inside state object
    },

    resetCart: (state) => {
      state.items = []; // Reset Redux cart state
    },

    addGuestItem: (state, action) => {
      const { dish: dishId, quantity } = action.payload;
      state.items = [...state.items, { dishId, quantity }];

      saveCartToLocalStorage(state.items);
    },

    updateGuestItemQuantity: (state, action) => {
      const { dishId, quantity } = action.payload;
      const item = state.items.find((item) => item.dishId._id === dishId);
      item.quantity = quantity;

      saveCartToLocalStorage(state.items);
    },

    removeGuestCartItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.dishId._id !== action.payload
      );
      saveCartToLocalStorage(state.items);
    },

    mergeGuestCart: (state) => {
      const guestCartItems = loadCartFromLocalStorage();
      state.items = [...state.items, ...guestCartItems];
      localStorage.removeItem("items"); // Clear guest cart after merging
    },
  },
});

export const cartSliceActions = cartSlice.actions;

export const fetchCart = (userId) => async (dispatch) => {
  const res = await fetch(`${BASE_URL}/restaurant/cart/${userId}`);
  const data = await res.json();
  const cart = data.cart;
  dispatch(cartSliceActions.setCart(cart.items || []));
};

export const addItemToCart =
  (userId, dish, quantity = 1) =>
  async (dispatch) => {
    if (!userId) {
      dispatch(cartSliceActions.addGuestItem({ dish, quantity }));
      return;
    }

    await fetch(`${BASE_URL}/restaurant/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, dishId: dish._id, quantity }),
    });

    dispatch(fetchCart(userId));
  };

export const updateCartItemQuantity =
  (userId, dishId, quantity) => async (dispatch) => {
    if (!userId) {
      dispatch(cartSliceActions.updateGuestItemQuantity({ dishId, quantity }));
      return;
    }
    await fetch(`${BASE_URL}/restaurant/cart/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, dishId, quantity }),
    });

    dispatch(fetchCart(userId));
  };

export const removeCartItem = (userId, dishId) => async (dispatch) => {
  if (!userId) {
    dispatch(cartSliceActions.removeGuestCartItem(dishId));
    return;
  }

  await fetch(`${BASE_URL}/restaurant/cart/remove`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, dishId }),
  });

  dispatch(fetchCart(userId));
};

export const mergeGuestCartWithUserCart =
  (userId, guestCart) => async (dispatch) => {
    if (guestCart.length === 0) return;

    await fetch(`${BASE_URL}/restaurant/cart/merge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, guestCart }),
    });

    dispatch(fetchCart(userId));
  };

export const cartActions = cartSlice.actions;
export default cartSlice;
