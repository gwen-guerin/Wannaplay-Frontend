import { createSlice } from "@reduxjs/toolkit";

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
    department: null,
    teacher: null,
    singer: null,
    status: null,
    photos: null,
    description: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.username = action.payload.username;
    },
    logout: (state) => {
      state.value.firstname = null;
      state.value.lastname = null;
      state.value.username = null;
      state.value.email = null;
      state.value.tags = [];
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
