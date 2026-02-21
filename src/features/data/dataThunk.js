// postThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDataApi } from "./dataService";

export const fetchData = createAsyncThunk(
  "data/fetchAll",
  async ({ page = 1, limit = 8, endpoint, signal }, { rejectWithValue }) => {
    try {
      const data = await getDataApi(page, limit, endpoint, signal);
      return { data, endpoint };
    } catch (err) { 
      if (err.name === "CanceledError") { 
        return rejectWithValue("Request canceled"); 
      } 
      return rejectWithValue(err.response?.data || "Failed to fetch data");
    }
  }
);