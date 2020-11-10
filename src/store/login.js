import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const { reducer, actions } = createSlice({
  name: 'login',
  initialState: {},
  reducers: {
    userLoggedIn: (user, action) => {
      const { id, firstName, username, role, courses } = action.payload;
      user.id = id;
      user.firstName = firstName;
      user.username = username;
      user.role = role;
      user.courses = courses;
    },
    userLoggedOut: (user, action) => user = {}
  }
});

export const { userLoggedIn, userLoggedOut } = actions;

export default reducer;

export const getLoggedInUserDetails = createSelector(
  state => state.login,
  login => login
);