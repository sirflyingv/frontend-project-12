import { createSlice } from '@reduxjs/toolkit';
import fetchData from '../fetchData';

const initialState = {
  currentChannelId: 1,
  channels: [{ id: 1, name: 'general', removable: false }],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    changeCurrentChannelId: (state, { payload }) => ({ ...state, currentChannelId: payload }),
    addChannel: (state, { payload }) => ({
      currentChannelId: state.currentChannelId,
      channels: [...state.channels, payload],
    }),
    removeChannel: (state, { payload }) => ({
      currentChannelId: state.currentChannelId,
      channels: state.channels.filter((channel) => channel.id !== payload),
    }),
    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      const updatedChannels = state.channels
        .map((channel) => (channel.id === id ? { ...channel, name } : channel));
      return ({
        currentChannelId: state.currentChannelId,
        channels: updatedChannels,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, { payload }) => ({
      currentChannelId: payload.currentChannelId,
      channels: payload.channels,
    }));
  },
});

export const {
  addChannel, removeChannel, renameChannel, changeCurrentChannelId,
} = channelsSlice.actions;
export default channelsSlice.reducer;
