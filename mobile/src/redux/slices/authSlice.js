import {createSlice} from '@reduxjs/toolkit';
import {refreshToken} from '@/redux/thunks/authThunks';
import {useNavigation} from '@react-navigation/native';

const initialState = {
  isOnboardingDisabled: false,
  isLoggedIn: false,
  user: {},
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOnboardingDisabled: (state, action) => {
      state.isOnboardingDisabled = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
      state.isLoggedIn = true;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    logout(state) {
      state.accessToken = null;    
      state.refreshToken = null;
      state.user = {};
      state.isLoggedIn = false;
    },
  },
});

export const {
  setOnboardingDisabled,
  setUser,
  setAccessToken,
  setRefreshToken,
  logout,
} = authSlice.actions;
export default authSlice.reducer;

const handleLogout = () => {
  const navigation = useNavigation();
  navigation.reset({
    index: 0,
    routes: [{name: 'Login'}],
  });
};
