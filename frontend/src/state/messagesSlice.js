import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const initialState = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => (payload),
    addMessage: (state, { payload }) => ([...state, payload]),
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        removeChannel,
        (state, { payload }) => state.filter((msg) => msg.channelId !== payload),
      );
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
