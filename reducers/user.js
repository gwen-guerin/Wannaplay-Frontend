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
      state.value.age = action.payload.age;
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.email = action.payload.email;
      state.value.tags = action.payload.tags;
      state.value.location = action.payload.location;
      state.value.friends = action.payload.friends;
      state.value.status = action.payload.status;
      state.value.city = action.payload.city;
      state.value.teacher = action.payload.teacher;
      state.value.photo = action.payload.photo;
      state.value.description = action.payload.description;
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
