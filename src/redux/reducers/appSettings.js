import {createSlice} from '@reduxjs/toolkit';

const appSettingSlice = createSlice({
  name: 'appSetting',
  initialState: {
    lang: 'en',
    selectedTheme: 'light',
    isSystemTheme: true,
  },
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
    },
    changeTheme: (state, action) => {
      state.selectedTheme = action.payload.selectedTheme;
      state.isSystemTheme = action.payload.isSystemTheme;
    },
  },
});

export const {changeLang, changeTheme} = appSettingSlice.actions;

export default appSettingSlice.reducer;
