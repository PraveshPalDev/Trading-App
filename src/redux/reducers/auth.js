import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: {},
    token: null,
  },
  reducers: {
    saveUserData: (state, action) => {
      state.userData = action.payload;
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {saveUserData, setAuthToken} = authSlice.actions;

export default authSlice.reducer;
