import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@store/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const RootState = store.getState();
const AppDispatch = store.dispatch;