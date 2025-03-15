import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002/api";



axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));




// ✅ Register User

export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/register`, userData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

// ✅ Login User
export const loginUser = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, userData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed.");
  }
});

// ✅ Get Profile
export const me = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/me`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch profile"
      );
    }
  }
);

// ✅ Logout User
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      return null;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Logout failed"
      );
    }
  }
);

// ✅ Forgot Password (Send Reset Link)
export const forgotPassword = createAsyncThunk(
  "auth/forgot-password", // 🔥 Fixed typo
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to send reset email");
    }
  }
);
export const google = createAsyncThunk("auth/google", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/google`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Google Login failed");
  }
});


// ✅ Reset Password
export const resetPassword = createAsyncThunk(
  "auth/reset-password", // 🔥 Fixed typo
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password: newPassword,
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to reset password");
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  token: null,
  message: null, // For success messages (e.g., password reset email sent)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    clearAuthMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Profile
      .addCase(me.pending, (state) => {
        state.loading = true;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(me.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Logout User
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = null;
        localStorage.removeItem("token"); // Already resets state, so remove redundant reset
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Removed duplicate case for 'logout.fulfilled'

      // ✅ Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload; // Success message
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload; // Success message
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(google.pending, (state) => { state.loading = true; })
      .addCase(google.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token); // 🔥 Store token if received
        }
        state.error = null;
      })
      .addCase(google.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { clearAuthError, clearAuthMessage } = authSlice.actions;
export default authSlice.reducer;
