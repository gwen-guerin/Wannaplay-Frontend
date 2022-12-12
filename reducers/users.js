import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
    //   const { firstname, lastame, username, email, password } = action.payload;
      state.value = state.value.push(action.payload)
    //   console.log(action.payload);
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;