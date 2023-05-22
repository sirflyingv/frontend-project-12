/* eslint-disable functional/no-expression-statements */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';
import { removeChannel } from './channelsSlice';

const initialState = [];
// const initialState = [{
//   id: 3, body: 'widePeepoHappy', channelId: 1, username: 'Doooorian',
// }];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => ([...state, payload]),
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(fetchData.pending, () => {
    //     console.log('Pending first data loading...');
    //   })
      .addCase(fetchData.fulfilled, (state, action) => (action.payload.messages))
      .addCase(
        removeChannel,
        (state, { payload }) => state.filter((msg) => msg.channelId !== payload),
      );
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
