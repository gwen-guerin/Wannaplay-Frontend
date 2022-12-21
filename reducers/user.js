import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: null,
    friends: [],
    status: null,
    photos: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.username = action.payload.username;
      state.value.status = action.payload.status;
    },
    logout: (state) => {
      state.value.username = null;
      state.value.status =false
    },

    addToFriends: (state, action) => {
      state.value.friends.push(action.payload.friend);
    },
    removeFromFriends: (state, action) => {
      state.value.friends = state.value.friends.filter((e) => e !== action.payload.friend);
    },
    addPhoto: (state, action) => {
      state.value.photo = action.payload;
    },
    removePhoto: (state, action) => {
      state.value.photos = state.value.photos.filter(
        (data) => data !== action.payload
      );
    },
    setFriends: (state, action) => {
      state.value.friends = action.payload.friends;
    },

  },
});

export const {
  login,
  logout,
  question,
  addToFriends,
  removeFromFriends,
  addPhoto,
  removePhoto,
  setFriends,
} = userSlice.actions;
export default userSlice.reducer;
