/* eslint-disable functional/no-expression-statements */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';
import { removeChannel } from './channelsSlice';

const initialState = 1;

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState,
  reducers: {
    changeCurrentChannelId: (state, { payload }) => payload,
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(fetchData.pending, () => {
    //     console.log('Pending first data loading...');
    //   })
      .addCase(fetchData.fulfilled, (state, { payload }) => (payload.currentChannelId))
      .addCase(
        removeChannel,
        (state, { payload }) => {
          console.log(payload, state);
          return (payload === state ? initialState : state);
        },
      );
  },
});

export const { actions } = currentChannelIdSlice;
export default currentChannelIdSlice.reducer;
