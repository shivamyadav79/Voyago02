import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/admin/places";

// Fetch all places
export const fetchPlaces = createAsyncThunk("adminPlaces/fetchPlaces", async (_, { getState }) => {
    const token = getState().auth.token;
    const headers = { Authorization: `Bearer ${token}` };
    try {
        const response = await axios.get(API_URL, { headers });
        return response.data;
    } catch (error) {
        console.error("Error creating place:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
});

// Create place
export const createPlace = createAsyncThunk("adminPlaces/createPlace", async (placeData, { getState }) => {
    const token = getState().auth.token;
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    const formattedPlaceData = {
        ...placeData,
        city: placeData.city.toString(),  // ✅ Ensure city is a string
    };

    try {
        const response = await axios.post("/api/admin/places", formattedPlaceData, { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
});


// Update place
export const updatePlace = createAsyncThunk(
    "adminPlaces/updatePlace",
    async ({ id, updatedData }, { getState, rejectWithValue }) => {
        if (!id) return rejectWithValue("ID is required for updating a place");

        const token = getState().auth.token;
        const headers = { Authorization: `Bearer ${token}` , "Content-Type": "application/json" };

        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData, { headers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update place");
        }
    }
);
;

export const deletePlace = createAsyncThunk("adminPlaces/deletePlace", async (id, { getState }) => {
    if (!id) throw new Error("ID is required for deleting a place");
    const token = getState().auth.token;
    const headers = { Authorization: `Bearer ${token}` };
    await axios.delete(`${API_URL}/${id}`, { headers });
    return id;
});

const adminPlaceSlice = createSlice({
    name: "adminPlaces",
    initialState: {
        places: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaces.pending, (state) => { state.loading = true; })
            .addCase(fetchPlaces.fulfilled, (state, action) => {
                state.loading = false;
                state.places = action.payload; // Corrected this line
                state.error = null;
            })
                .addCase(fetchPlaces.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                })
                .addCase(createPlace.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(createPlace.fulfilled, (state, action) => {
                    state.loading = false;
                    state.places.push(action.payload);
                })
                .addCase(createPlace.rejected, (state, action) => {
                    state.error = action.error.message;
                })
                .addCase(updatePlace.pending, (state) => {
                    state.error = null;  // Reset error
                })
                .addCase(updatePlace.fulfilled, (state, action) => {
                    const index = state.places.findIndex((p) => p._id === action.payload._id);
                    if (index !== -1) {
                        state.places[index] = action.payload; // ✅ Ensure state is updated correctly
                    }                })
                .addCase(updatePlace.rejected, (state, action) => {
                    state.error = action.error.message;
                })
                .addCase(deletePlace.fulfilled, (state, action) => {
                    state.places = state.places.filter(p => p.id !== action.payload);
                });
        },
    });

export default adminPlaceSlice.reducer;
