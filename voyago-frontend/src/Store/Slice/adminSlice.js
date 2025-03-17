import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch analytics from backend
export const fetchAnalytics = createAsyncThunk("admin/fetchAnalytics", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token"); // Retrieve token from storage
        console.log(localStorage.getItem("token"));

      const response = await fetch("http://localhost:5173/api/admin/analytics", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Send token in headers
          
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }
  
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
  

// Fetch all cities
export const fetchCities = createAsyncThunk("admin/fetchCities", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to fetch cities");
    }
});


// Create a new city
export const createCity = createAsyncThunk("admin/createCity", async (cityData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(API_URL, cityData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to create city");
    }
});



// Update a city
export const updateCity = createAsyncThunk("admin/updateCity", async ({ id, cityData }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${API_URL}/${id}`, cityData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to update city");
    }
});



// Delete a city
export const deleteCity = createAsyncThunk("admin/deleteCity", async (id, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to delete city");
    }
});





const adminSlice = createSlice({
  name: "admin",
  initialState: { analytics: {}, cities: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Cities
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
    })
    .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
    })
    .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    // Create City
    .addCase(createCity.fulfilled, (state, action) => {
        state.cities.push(action.payload.city);
    })
    // Update City
    .addCase(updateCity.fulfilled, (state, action) => {
        state.cities = state.cities.map((city) =>
            city._id === action.payload.city._id ? action.payload.city : city
        );
    })
    // Delete City
    .addCase(deleteCity.fulfilled, (state, action) => {
        state.cities = state.cities.filter((city) => city._id !== action.payload);
    });
  },
});

export default adminSlice.reducer;
