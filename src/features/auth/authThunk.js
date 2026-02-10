import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "./authService";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await loginApi(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await registerApi(payload);
          return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Register failed");
    }
  }
);
