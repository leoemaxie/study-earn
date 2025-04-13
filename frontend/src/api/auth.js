import {makeApiRequest} from './request';

export const registerUser = async data => {
  const response = await makeApiRequest('POST', '/auth/register', data);
  return response;
};

export const loginUser = async data => {
  const response = await makeApiRequest('POST', '/auth/login', data);
  return response;
};

export const verifyEmail = async data => {
  const response = await makeApiRequest('POST', '/auth/verify-email', data);
  return response;
};

export const sendOTP = async data => {
  const response = await makeApiRequest('POST', '/auth/send-otp', data);
  return response;
};

export const resetPassword = async data => {
  const response = await makeApiRequest('POST', '/auth/reset-password', data);
  return response;
};

export const refreshToken = async data => {
  const response = await makeApiRequest('POST', '/auth/refresh-token', data);
  return response;
};

export const logoutUser = async data => {
  const response = await makeApiRequest('POST', '/auth/logout', data);
  return response;
};
