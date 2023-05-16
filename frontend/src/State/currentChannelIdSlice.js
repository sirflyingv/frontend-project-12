/* eslint-disable functional/no-expression-statements */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = 1;

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState,
  reducers: {
    changeCurrentChannelId: (state, { payload }) => (payload.currentChannelId),
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(fetchData.pending, () => {
    //     console.log('Pending first data loading...');
    //   })
      .addCase(fetchData.fulfilled, (state, { payload }) => (payload.currentChannelId));
  },
});

export const { actions } = currentChannelIdSlice;
export default currentChannelIdSlice.reducer;
