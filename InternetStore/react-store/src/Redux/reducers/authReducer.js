import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, payload: null },
  reducers: {
    login(state, { payload: { token } }) {
        const payload = jwtDecode(token);
        console.log('Decoded payload:', payload);
        state.payload = payload;
        state.token = token;
    },
    logout(state) {
      console.log(state)
      state.payload = null;
      state.token = null;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
