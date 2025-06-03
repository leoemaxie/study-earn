import axios from 'axios';
import constants from '@/redux/constants';
import reduxStore from '@/redux/store';
import {jwtDecode} from 'jwt-decode';
import {setAccessToken} from '@/redux/slices/authSlice';
import {logout} from '@/redux/slices/authSlice';
import base64 from '@/utils/base64';

global.atob = base64.atob;

const {BASE_URL} = constants;
const client = axios.create({baseURL: BASE_URL});

export const hasExpired = (token, bufferTime = 0) => {
  if (!token) return true;
  const {exp} = jwtDecode(token);
  return Date.now() >= exp * 1000 - bufferTime;
};

export const refreshToken = async () => {
  const {accessToken, refreshToken} = reduxStore.getState().auth;
  // Use a proper logging mechanism for production
  console.info('Access token retrieved', accessToken);

  if (!accessToken || !refreshToken) {
    reduxStore.dispatch(logout());
    return null;
  }

  if (hasExpired(accessToken, 60 * 1000)) {
    if (!hasExpired(refreshToken)) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
          token: refreshToken,
        });
        console.log('response from refreshToken', response);
        const {accessToken: newAccessToken} = response.data;
        reduxStore.dispatch(setAccessToken(newAccessToken));
        return newAccessToken;
      } catch (error) {
        console.log('error from refreshToken', error);

        if (error.response && error.response.status === 401) {
          reduxStore.dispatch(logout());
        }
        return null;
      }
    }
  }
  return accessToken;
};

client.interceptors.request.use(
  async function (config) {
    if (config.url.includes('auth') || config.url.includes('school')) {
      return config;
    }

    if (config.url.includes('file/upload')) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    const accessToken = await refreshToken();

    if (accessToken) {
      console.log('accessToken here:   ', accessToken);
      console.log(reduxStore.getState().auth.refreshToken);

      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default client;
