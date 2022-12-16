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
    department: null,
    teacher: null,
    singer: null,
    status: null,
    photos: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
<<<<<<< HEAD
      console.log('payload',action.payload)
      // const { firstname, lastname, username, email, password, token } = action.payload;
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lasname;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
      // state.value.token = action.payload.token; 
=======
      state.value.username = action.payload.username;
>>>>>>> 60d368e8e8dcc1adf894bef2a10f04e3d9e09f3e
      state.value.age = action.payload.age;
      state.value.tags.push(action.payload.tags);
      state.value.city = action.payload.city;
      state.value.department = action.payload.department;
      state.value.status = action.payload.status;
      state.value.teacher = action.payload.teacher;
      state.value.singer = action.payload.singer;
      state.value.photos.push(action.payload.photos);


    },
    logout: (state) => {
      state.value.firstname = null;
      state.value.lastname = null;
      state.value.username = null;
      state.value.email = null;
      state.value.tags = [];
    },
  
    addFriend: (state, action) => {
    state.value.friends = state.value.friends.push(action.payload);
    },
    removeFriend: (state, action) => {
      state.value = state.value.filter((e) => e.username !== action.payload);
    },
    addPhoto: (state, action) => {
      state.value.photos.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.value.photos = state.value.photos.filter((data) => data !== action.payload);
    },
  }
});

export const { login, logout, question, addFriend, removeFriend, addPhoto, removePhoto } = userSlice.actions;
export default userSlice.reducer;
