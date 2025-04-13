import {persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import constants from '@/redux/constants';
import authReducer from '@/redux/slices/authSlice';
import scheduleReducer from '@/redux/slices/scheduleSlice';

const config = {
  key: constants.asyncStorageKey,
  storage: EncryptedStorage,
  reducer: {
    auth: authReducer,
    schedule: scheduleReducer,
  },
};

const rootReducer = persistReducer(config, combineReducers(config.reducer));

export default rootReducer;
