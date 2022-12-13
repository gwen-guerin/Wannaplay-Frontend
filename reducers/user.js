import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    firstname: null,
    lastname: null,
    username: null,
    email: null,
    password: null,
    token: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      // const { firstname, lastname, username, email, password, token } = action.payload;
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lasname;
      state.value.username = action.payload.username;
      // state.value.email = action.payload.email;
      // state.value.password = action.payload.password;
      // state.value.token = action.payload.token;
    },
    logout: (state) => {
      state.value.firstname = null;
      state.value.lastname = null;
      state.value.username = null;
      // state.value.email = null;
      // state.value.password = null;
      // state.value.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
