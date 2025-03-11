import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to Fetch Places
export const fetchPlaces = createAsyncThunk(
  "places/fetchPlaces",
  async (cityId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/places?city=${cityId}`);
      return response.data; // Assuming API returns an array of places
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch places");
    }
  }
);

const initialState = {
  places: [],
  loading: false,
  error: null,
};

const placeSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    clearPlaces: (state) => {
      state.places = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selector to Filter Places by Category
export const selectPlacesByCategory = (category) => (state) =>
  state.places.places.filter((place) => place.category === category);

export const { clearPlaces } = placeSlice.actions;
export default placeSlice.reducer;
