export const API_BASE_URL = 'https://app.trade-link.gr/api/';

export const getApiURL = endpoint => API_BASE_URL + endpoint;

// auth all api endpoints
export const SIGNUP_API = getApiURL('Users/register');
export const LOGIN_API = getApiURL('Users/login');
