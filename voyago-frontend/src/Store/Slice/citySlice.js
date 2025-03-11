import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to Fetch City Details
export const fetchCity = createAsyncThunk(
  "city/fetchCity",
  async (cityId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/cities/${cityId}`);
      return response.data; // Assuming API returns city details
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch city details"
      );
    }
  }
);

const initialState = {
  city: null,
  loading: false,
  error: null,
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    clearCity: (state) => {
      state.city = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCity.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload;
      })
      .addCase(fetchCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCity } = citySlice.actions;
export default citySlice.reducer;
