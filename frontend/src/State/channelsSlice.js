/* eslint-disable functional/no-expression-statements */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = [{ id: 1, name: 'general', removable: false }];

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => ([...state, payload]),
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(fetchData.pending, () => {
    //     console.log('Pending first data loading...');
    //   })
      .addCase(fetchData.fulfilled, (state, action) => (action.payload.channels));
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
