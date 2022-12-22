import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    firstname: null,
    lastname: null,
    username: null,
    email: null,
    age: null,
    tags: [],
    location: [],
    friends: [],
    status: null,
    city: null,
    photo: null,
    description: null,
    teacher: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.username = action.payload.username;
      state.value.status = action.payload.status;
    },
    logout: (state) => {
      state.value.username = null;
    },

    addToFriends: (state, action) => {
      state.value.friends.push(action.payload.friend);
    },
    removeFromFriends: (state, action) => {
      state.value.friends = state.value.friends.filter(
        (e) => e !== action.payload.friend
      );
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
      console.log('payload',action.payload.friends)
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
