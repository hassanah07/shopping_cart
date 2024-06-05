// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   // cartCountData: 0,
//   cart: []
// };

// // export const cartCountData = createAsyncThunk("cartCountData", async () => {
// //   let response = await fetch("https://jsonplaceholder.typicode.com/users");
// //   return response.json();
// // });

// const cartSlice = createSlice({
//   name: "cartSlice",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const { id, ...rest } = action.payload;
//       const existingItemIndex = state.cart.findIndex(
//         (item) => item.data.id === id
//       );

//       if (existingItemIndex !== -1) {
//         state.cart[existingItemIndex].qty += 1;
//       } else {
//         state.cart.push({ data: { id, ...rest }, qty: 1 });
//       }
//     }
//     // reduceQty: (state, action) => {
//     //   const itemId = action.payload;
//     //   const existingItemIndex = state.cart.findIndex(
//     //     (item) => item.data.id === itemId
//     //   );

//     //   if (existingItemIndex !== -1 && state.cart[existingItemIndex].qty > 1) {
//     //     state.cart[existingItemIndex].qty -= 1;
//     //   }
//     // },
//     // increaseQty: (state, action) => {
//     //   const itemId = action.payload;
//     //   const existingItemIndex = state.cart.findIndex(
//     //     (item) => item.data.id === itemId
//     //   );

//     //   if (existingItemIndex !== -1) {
//     //     state.cart[existingItemIndex].qty += 1;
//     //   }
//     // },
//     // deleteItem: (state, action) => {
//     //   const itemId = action.payload;
//     //   state.cart = state.cart.filter((item) => item.data.id !== itemId);
//     // }
//   }
//   // extraReducers: (builder) => {
//   //   builder.addCase(cartCountData.fulfilled, (state, action) => {
//   //     // console.log("object", action);
//   //     state.isloading = false;
//   //     state.cart = action.payload.length;
//   //     console.log(state.cart);
//   //   });
//   // }
// });

// export const { addToCart } = cartSlice.actions;
// export default cartSlice.reducer;
