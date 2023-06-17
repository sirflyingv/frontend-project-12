import { createSlice } from '@reduxjs/toolkit';
import fetchData from '../fetchData';
import { removeChannel } from './channelsSlice';

const initialState = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => ([...state, payload]),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => (action.payload.messages))
      .addCase(
        removeChannel,
        (state, { payload }) => state.filter((msg) => msg.channelId !== payload),
      );
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
