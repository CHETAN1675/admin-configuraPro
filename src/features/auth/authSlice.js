import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup } from "../../services/firebaseAuth"; // your firebaseAuth functions

const savedAuth = JSON.parse(localStorage.getItem("adminAuth"));

// Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login(email, password);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Signup user
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password, name, isAdmin }, { rejectWithValue }) => {
    try {
      const data = await signup(email, password);

      // Save user data in your DB
      const key = email.replace(/\./g, "_");
      await fetch(
        `https://configurapro-default-rtdb.firebaseio.com/users/${key}.json`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, isAdmin }),
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: savedAuth?.token || null,
    email: savedAuth?.email || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.email = null;
      localStorage.removeItem("adminAuth");
    },
    restoreAdmin(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.idToken;
        state.email = action.payload.email;
        localStorage.setItem(
          "adminAuth",
          JSON.stringify({ token: action.payload.idToken, email: action.payload.email })
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.idToken;
        state.email = action.payload.email;
        localStorage.setItem(
          "adminAuth",
          JSON.stringify({ token: action.payload.idToken, email: action.payload.email })
        );
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, restoreAdmin } = authSlice.actions;
export default authSlice.reducer;
