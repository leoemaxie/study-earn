import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '@/redux/reducers';

const reduxStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default reduxStore;
