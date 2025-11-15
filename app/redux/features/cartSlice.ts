import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "~/services/httpServices/userService";
import type { UserState } from "~/types/user";

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetUser(state) {
      state.users = [];
    },
    setUser(state) {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = true;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUser, setUser } = cartSlice.actions;
export default cartSlice.reducer;
