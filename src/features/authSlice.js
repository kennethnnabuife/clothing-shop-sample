import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (userData) => {
    const response = await axios.post(
      "http://localhost:5000/api/register",
      userData
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (userCheck) => {
    const response = await axios.post(
      "http://localhost:5000/api/login",
      userCheck
    );
    return response.data;
  }
);

const initialState = {
  user: null,
  registerStatus: null,
  loginStatus: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.registerStatus = null;
      state.loginStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.registerStatus = "succeeded";
      })
      .addCase(registerUser.rejected, (state) => {
        state.registerStatus = "failed";
      })

      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginStatus = "succeeded";
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginStatus = "failed";
      });
  },
});
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
