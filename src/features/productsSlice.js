import { createSlice } from "@reduxjs/toolkit";
import Products from "./productsArray";

const initialState = {
  items: Products,
  status: "idle",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default productsSlice.reducer;
