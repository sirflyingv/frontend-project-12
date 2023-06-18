import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: 1,
  channels: [{ id: 1, name: 'general', removable: false }],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => (payload),
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
});

export const {
  setChannels, addChannel, removeChannel, renameChannel, changeCurrentChannelId,
} = channelsSlice.actions;
export default channelsSlice.reducer;
