import {LOGIN_API, SIGNUP_API} from '../../config/urls';
import {apiPost} from '../../utils/apiClient';
import {storeData} from '../../utils/helperFunctions';
import {saveUserData} from '../reducers/auth';
import store from '../store';
import types from '../types';
const {dispatch} = store;

export const userLogin = data => {
  return new Promise((resolve, reject) => {
    apiPost(LOGIN_API, data)
      .then(res => {
        if (!!res?.data) {
          storeData('userData', res?.data)
            .then(value => {
              console.log('user login data saved in AsyncStorage !!');
              resolve(res);
              dispatch(saveUserData(res?.data));
            })
            .catch(error => {
              reject(error);
            });
        } else {
          resolve(res);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const userSignup = data => {
  return apiPost(SIGNUP_API, data);
};

export function logout() {
  dispatch({type: types.CLEAR_REDUX_STATE});
}
