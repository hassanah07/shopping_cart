import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: []
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, ...rest } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.data.id === id
      );

      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].qty += 1;
      } else {
        state.cart.push({ data: { id, ...rest }, qty: 1 });
      }
    },
    reduceQty: (state, action) => {
      const itemId = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.data.id === itemId
      );

      if (existingItemIndex !== -1 && state.cart[existingItemIndex].qty > 1) {
        state.cart[existingItemIndex].qty -= 1;
      }
    },
    increaseQty: (state, action) => {
      const itemId = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.data.id === itemId
      );

      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].qty += 1;
      }
    },
    deleteItem: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.filter((item) => item.data.id !== itemId);
    }
  }
});

export const { addToCart, reduceQty, increaseQty, deleteItem } =
  cartSlice.actions;
export default cartSlice.reducer;
