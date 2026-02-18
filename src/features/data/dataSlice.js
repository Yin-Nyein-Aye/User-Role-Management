// dataSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchData, fetchDataById } from "./dataThunk";

const initialState = {
  items: [],
  total : 0,
  page : 1,
  limit : 8,
  selectedPost: null,
  // loading: false,
  // error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPage(state, action) { 
      state.page = action.payload; 
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchData.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchData.fulfilled, (state, action) => {
  //       const { data, endpoint } = action.payload; 
  //       state.loading = false; 
  //       state.items = data[endpoint] || data; 
  //       state.total = data.total; 
  //       state.limit = data.limit;
  //     })
  //     .addCase(fetchData.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     })
  //     .addCase(fetchDataById.fulfilled, (state, action) => {
  //       state.selectedPost = action.payload;
  //     });
  // },
});

export const { setPage } = dataSlice.actions;
export default dataSlice.reducer;
