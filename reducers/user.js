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
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      // const { firstname, lastname, username, email, password, token } = action.payload;
      // state.value.firstname = action.payload.firstname;
      // state.value.lastname = action.payload.lasname;
      state.value.username = action.payload.username;
      // state.value.email = action.payload.email;
      // state.value.password = action.payload.password;
      // state.value.token = action.payload.token; 
      state.value.age = action.payload.age;
      state.value.tags.push(action.payload.tags);
      state.value.city = action.payload.city;
      state.value.department = action.payload.department;
      state.value.status = action.payload.status;
      state.value.teacher = action.payload.teacher;
      state.value.singer = action.payload.singer;

    },
    logout: (state) => {
      state.value.firstname = null;
      state.value.lastname = null;
      state.value.username = null;
      state.value.email = null;
      state.value.tags = [];
      // state.value.password = null;
      // state.value.token = null;
    },
  
    addFriend: (state, action) => {
    state.value.friends = state.value.friends.push(action.payload);
    },
    removeFriend: (state, action) => {
      state.value = state.value.filter((e) => e.username !== action.payload);
    },
  }
});

export const { login, logout, question, addFriend, removeFriend } = userSlice.actions;
export default userSlice.reducer;
