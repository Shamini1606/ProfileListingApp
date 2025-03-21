// src/store/profilesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all profiles
export const fetchProfiles = createAsyncThunk(
  "profiles/fetchProfiles",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data; // Return the array of users
  }
);

const profilesSlice = createSlice({
  name: "profiles",
  initialState: {
    profiles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true; // Set loading to true when the request is pending
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is fulfilled
        state.profiles = action.payload; // Store the fetched profiles
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request is rejected
        state.error = action.error.message; // Store the error message
      });
  },
});

export default profilesSlice.reducer;
