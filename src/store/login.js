import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'login',
  initialState: {},
  reducers: {
    userLoggedIn: (user, action) => {
      const { id, firstName } = action.payload;
      user.id = id;
      user.firstName = firstName;
    },
    userLoggedOut: (user, action) => user = {}
  }
});

export const { userLoggedIn, userLoggedOut } = actions;

export default reducer;