export const API_BASE_URL = 'https://app.trade-link.gr/api/';

export const getApiURL = endpoint => API_BASE_URL + endpoint;

// auth all api endpoints
export const SIGNUP_API = getApiURL('Users/register');
export const LOGIN_API = getApiURL('Users/login');

// news
export const GET_ALL_NEWS = getApiURL('v1/News');
export const GET_ALL_NEWS_TYPES = getApiURL('v1/News/GetNewsBySectionType');
// stocks
export const GET_ALL_STOCKS = getApiURL('AthexStockData');
// RDS
export const GetTickerBasicInformation = getApiURL('RDS/GetTickerBasicInfo');
// events
export const GET_ALL_EVENT_CATEGORY = getApiURL('Event/GetAllEventCategory');
export const GET_EVENT = getApiURL('Event/GetBetweenDate');
