import {jwtDecode} from 'jwt-decode';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {useNavigation} from '@react-navigation/native';
import {refreshToken as refreshApi} from '@/api/auth';
import {logout} from '@/redux/slices/authSlice';
import base64 from '@/utils/base64';

global.atob = base64.atob;

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, {dispatch, getState}) => {
    const {accessToken, refreshToken} = getState().auth;

    if (!accessToken || !refreshToken) {
      dispatch(logout());
      throw new Error('Missing tokens');
    }

    if (hasExpired(accessToken, 60 * 1000)) {
      if (!hasExpired(refreshToken)) {
        const response = await refreshApi({token: refreshToken});
        const {accessToken: newAccessToken} = response.data;
        return newAccessToken;
      } else {
        dispatch(logout());
        throw new Error('Refresh token expired');
      }
    }

    return accessToken;
  },
);

export const hasExpired = (token, bufferTime = 0) => {
  if (!token) return true;
  const {exp} = jwtDecode(token);
  return Date.now() >= exp * 1000 - bufferTime;
};

const handleLogout = dispatch => {
  const navigation = useNavigation();

  dispatch(logout());
  navigation.reset({
    index: 0,
    routes: [{name: 'Login'}],
  });
};
