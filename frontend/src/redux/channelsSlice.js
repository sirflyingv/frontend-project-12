/* eslint-disable functional/no-expression-statements */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = {
  channels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => ({ channels: [...state.channels, payload] }),
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(fetchData.pending, () => {
    //     console.log('Pending first data loading...');
    //   })
      .addCase(fetchData.fulfilled, (state, action) => {
        console.log('action', action.payload);
        return { channels: action.payload.channels };
      });
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
