import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: {firstname: null, lastname: null, username: null, email: null, password: null, token: null},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { firstname, lastname, username, email, password, token } = action.payload;
    //   console.log(action.payload);
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
