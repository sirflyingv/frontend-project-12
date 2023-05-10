/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';

export default configureStore({
  reducer: {
    data: dataReducer,
  },
});
