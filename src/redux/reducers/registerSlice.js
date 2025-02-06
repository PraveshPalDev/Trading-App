import {createSlice} from '@reduxjs/toolkit';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    isRegister: false,
  },
  reducers: {
    setRegisterTrue: state => {
      state.isRegister = true;
    },
  },
});

export const {setRegisterTrue} = registerSlice.actions;
export default registerSlice.reducer;
