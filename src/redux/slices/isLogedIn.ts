// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true' || false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    doLogin: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true'); // Store login state in local storage
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.setItem('isLoggedIn', 'false'); // Store logout state in local storage
    },
  },
});

export const { doLogin, logout } = userSlice.actions;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;
