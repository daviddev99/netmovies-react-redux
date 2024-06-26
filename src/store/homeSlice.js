import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: {},
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const { getApiConfiguration } = homeSlice.actions;

export default homeSlice.reducer
