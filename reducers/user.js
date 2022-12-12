import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: { email: null, photos: [] },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { firstName, lastName, username, email, password } = action.payload;
    },
  },
});

export const { } = userSlice.actions;
export default userSlice.reducer;
