import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  schedules: [],
  loading: false,
  error: null,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setSchedule(state, action) {
      state.schedules = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    removeSchedule(state, action) {
      state.schedules = state.schedules.filter(
        schedule => schedule.id !== action.payload,
      );
    },
  },
});

export const {setSchedule, setLoading, setError, removeSchedule} =
  scheduleSlice.actions;
export default scheduleSlice.reducer;
