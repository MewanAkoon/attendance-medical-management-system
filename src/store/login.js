import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const { reducer, actions } = createSlice({
  name: 'login',
  initialState: {},
  reducers: {
    userLoggedIn: (user, action) => {
      const { id, firstName, surname } = action.payload;
      user.id = id;
      user.firstName = firstName;
      user.surname = surname;
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