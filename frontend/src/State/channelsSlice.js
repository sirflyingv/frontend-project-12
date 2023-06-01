import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = [{ id: 1, name: 'general', removable: false }];

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => ([...state, payload]),
    removeChannel: (state, { payload }) => state.filter((channel) => channel.id !== payload),
    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      return state.map((channel) => (channel.id === id ? { ...channel, name } : channel));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => (action.payload.channels));
  },
});

export const { addChannel, removeChannel, renameChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
