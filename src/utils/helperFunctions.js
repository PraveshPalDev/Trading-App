import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeAppTheme, changeLanguage} from '../redux/actions/appSettings';
import {showMessage} from 'react-native-flash-message';
import colors from '../styles/colors';
import {saveUserData} from '../redux/reducers/auth';

export const storeData = async (key, value) => {
  try {
    var jsonValue = value;
    if (typeof value !== 'string') {
      jsonValue = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    return e;
  }
};

export const getData = async key => {
  try {
    const res = await AsyncStorage.getItem(key);
    return res != null
      ? typeof res !== 'string'
        ? JSON.parse(res)
        : res
      : null;
  } catch (e) {
    return e;
  }
};

export const clearData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

// this both method to set the initial lang and theme
export const initiateTheme = async (dispatch, theme) => {
  try {
    const myTheme = await getData('theme');
    if (myTheme) {
      const themeData = JSON.parse(myTheme);

      changeAppTheme(themeData, dispatch);
    } else {
      const obj = {
        lang: 'en',
        selectedTheme: theme,
        isSystemTheme: true,
      };

      changeAppTheme(obj, dispatch);
    }
  } catch (error) {
    console.log('Error: Unable to retrieve theme data');
  }
};

export const initiateLang = async dispatch => {
  try {
    let myLang = await getData('language');

    if (!!myLang) {
      changeLanguage(myLang);
    }
  } catch (error) {
    console.log('no data found');
  }
};

export const initUserData = async dispatch => {
  try {
    let data = await getData('userData');
    if (!!data) {
      const userData = JSON.parse(data);
      dispatch(saveUserData(userData));
      return data;
    }
  } catch (error) {
    console.log('no initial user data found');
  }
};

export const showError = message => {
  showMessage({
    message,
    type: 'danger',
    backgroundColor: colors.red,
    color: colors.white,
    duration: 2000,
  });
};

export const showSuccess = message => {
  showMessage({
    message,
    type: 'success',
    backgroundColor: colors.lightGreen,
    color: colors.white,
    duration: 2500,
  });
};

// chatBlack user modal alert
export const showConfirmationDialog = (
  title,
  message,
  onYesPress,
  onNoPress,
) => {
  alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        onPress: onNoPress,
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: onYesPress,
      },
    ],
    {cancelable: false},
  );
};

// logout Handler
export const logoutHandler = dispatch => {
  dispatch(saveUserData({}));
  clearData('userData');
};
