import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const cartData = createAsyncThunk("cart/cartData", async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/products/findCart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("userToken")
        }
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch cart data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  cart: [],
  status: "idle",
  error: null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(cartData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(cartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export default cartSlice.reducer;
