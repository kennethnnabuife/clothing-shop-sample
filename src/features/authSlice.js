import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

// Async thunks for registering and logging in users
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        userData
      );
      return response.data;
    } catch (error) {
      // Extract the error message from the server-side response and pass it as part of the action payload
      return thunkAPI.rejectWithValue(
        error.response.data || "An error occurred"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCheck, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        userCheck
      );
      return response.data;
    } catch (error) {
      // Extract the error message from the server-side response and pass it as part of the action payload
      return thunkAPI.rejectWithValue(
        error.response.data || "An error occurred"
      );
    }
  }
);

// Define the initial state for auth slice
const initialState = {
  token: null,
  email: null,
  registerLoading: false,
  registerSuccess: false,
  registerError: null,
  loginLoading: false,
  loginSuccess: false,
  loginError: null,
};

// auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.email = null;
      state.registerLoading = false;
      state.registerSuccess = false;
      state.registerError = null;
      state.loginLoading = false;
      state.loginSuccess = false;
      state.loginError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerSuccess = false;
        state.registerError = null;
        state.registerLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerError = null;
        state.registerSuccess = true;
        state.token = action.payload;
        const decodedUser = jwtDecode(state.token);
        state.email = decodedUser.email;
      })
      .addCase(registerUser.rejected, (state, action) => {
        // Store the error message in the state
        state.registerLoading = false;
        state.registerSuccess = false;
        state.registerError = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loginSuccess = false;
        state.loginError = null;
        state.loginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginError = null;
        state.loginSuccess = true;
        state.token = action.payload;
        const decodedUser = jwtDecode(state.token);
        state.email = decodedUser.email;
      })
      .addCase(loginUser.rejected, (state, action) => {
        // Store the error message in the state
        state.loginLoading = false;
        state.loginSuccess = false;
        state.loginError = action.payload;
      });
  },
});

// Export the auth slice reducer and actions
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
