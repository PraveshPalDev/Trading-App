export const API_BASE_URL =
  'https://ocelotapigw-app.greenfield-87f17211.centralindia.azurecontainerapps.io/';

export const getApiURL = endpoint => API_BASE_URL + endpoint;

// auth all api endpoints
export const SIGNUP_API = getApiURL('Register');
