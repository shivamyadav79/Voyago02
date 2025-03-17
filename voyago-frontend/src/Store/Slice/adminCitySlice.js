import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCities = createAsyncThunk(
    "city/fetchCities",
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");
  
        const response = await axios.get("/api/admin/cities", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid API response: Expected an array");
        }
  
        return response.data;
      } catch (error) {
        console.error("Fetch Cities Error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || "Unknown error");
      }
    }
  );
  
  

// Create City
export const createCity = createAsyncThunk(
  "city/createCity",
  async (cityData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/admin/cities", cityData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.city;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Unknown error");
    }
  }
);

// Delete City
export const deleteCity = createAsyncThunk(
  "city/deleteCity",
  async (cityId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/admin/cities/${cityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return cityId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateCity = createAsyncThunk(
  "adminCity/updateCity",
  async (city, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/cities/${city._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(city),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Slice
const adminCitySlice = createSlice({
  name: "city",
  initialState: { cities: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        console.log("Redux - API Data Received:", action.payload);  // ✅ Debugging API response
        state.loading = false;
        state.cities = Array.isArray(action.payload) ? action.payload : []; // ✅ Ensure it's always an array
      })
      
      
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.cities.push(action.payload);
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        state.cities = state.cities.map((city) =>
          city._id === action.payload._id ? action.payload : city
      );
    })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.cities = state.cities.filter(
          (city) => city._id !== action.payload
        );
      });
  },
});

export default adminCitySlice.reducer;
