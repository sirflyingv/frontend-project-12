/* eslint-disable functional/no-expression-statements */
import { createSlice } from '@reduxjs/toolkit';
// import fetchData from './fetchData';

const initialState = {
  opened: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, { payload }) => ({ opened: payload }),
  },
//   extraReducers: (builder) => {
//     builder
//     //   .addCase(fetchData.pending, () => {
//     //     console.log('Pending first data loading...');
//     //   })
//       .addCase(fetchData.fulfilled, (state, { payload }) => (payload.currentChannelId));
//   },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
