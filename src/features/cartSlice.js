import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const receivedItem = action.payload;
      const existingItem = state.cartItems.find(
        (currentCartItem) => currentCartItem.id === receivedItem.id
      );
      if (existingItem) {
        existingItem.cartQuantity += 1;
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        const addNewItem = { ...receivedItem, cartQuantity: 1 };
        state.cartItems = [...state.cartItems, addNewItem];
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action) {
      const receivedItem = action.payload;
      const existingItem = state.cartItems.find(
        (currentCartItem) => currentCartItem.id === receivedItem.id
      );
      if (existingItem.cartQuantity >= 1) {
        existingItem.cartQuantity -= 1;
        toast.info("Reduced product quantity", {
          position: "bottom-left",
        });
      }
      if (existingItem.cartQuantity <= 0) {
        state.cartItems = state.cartItems.filter(
          (currentCartItem) => currentCartItem.id !== receivedItem.id
        );
        toast.info("Product removed from cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeProduct(state, action) {
      const receivedItem = action.payload;
      const existingItem = state.cartItems.find(
        (currentCartItem) => currentCartItem.id === receivedItem.id
      );
      if (existingItem) {
        state.cartItems = state.cartItems.filter(
          (currentCartItem) => currentCartItem.id !== receivedItem.id
        );
        toast.info("Product removed from cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    getTotals(state) {
      const totalQuantity = state.cartItems.reduce(
        (total, currentCartItem) => total + currentCartItem.cartQuantity,
        0
      );
      const totalAmount = state.cartItems.reduce(
        (total, currentCartItem) =>
          total + currentCartItem.price * currentCartItem.cartQuantity,
        0
      );
      state.cartTotalQuantity = totalQuantity;
      state.cartTotalAmount = parseFloat(totalAmount.toFixed(2));
    },

    clearCart(state) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      localStorage.removeItem("cartItems");
      toast.info("Cart cleared", {
        position: "bottom-left",
      });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  removeProduct,
  getTotals,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
