import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export async function getHeaders() {
  let userData = await AsyncStorage.getItem('userData');
  if (userData) {
    userData = JSON.parse(userData);
    return {
      authorization: `${userData.token}`,
    };
  }
  return {};
}

export async function apiReq(
  endPoint,
  data,
  method,
  headers,
  requestOptions = {},
) {
  return new Promise(async (res, rej) => {
    const getTokenHeader = await getHeaders();

    headers = {
      ...getTokenHeader,
      ...headers,
    };

    if (method === 'get' || method === 'delete') {
      data = {
        ...requestOptions,
        ...data,
        headers,
      };
    }

    // Detect if the data is a FormData instance
    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    }

    axios[method](endPoint, data, {headers})
      .then(result => {
        const {data} = result;
        if (data.status === false) {
          return reject(data);
        }
        return res(data);
      })
      .catch(error => {
        console.log('error =>', error);

        if (error && error.response && error.response.status === 401) {
          console.log('user not valid');
        }
        if (error && error.response && error.response.data) {
          if (!error.response.data) {
            return rej({
              ...error.response.data,
              message: error.response.data || 'Network Error',
            });
          }
          return rej(error.response.data);
        } else {
          return rej({message: 'Network Error', message: 'Network Error'});
        }
      });
  });
}

export function apiPost(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'post', headers);
}

export function apiDelete(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'delete', headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
  return apiReq(endPoint, data, 'get', headers, requestOptions);
}

export function apiPut(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'put', headers);
}
