import { createSlice } from "@reduxjs/toolkit";
import Products from "./productsArray";

const initialState = {
  items: Products,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
});

export default productsSlice.reducer;
