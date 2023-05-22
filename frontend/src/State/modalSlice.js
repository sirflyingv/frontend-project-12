/* eslint-disable functional/no-expression-statements */
import { createSlice } from '@reduxjs/toolkit';
// import fetchData from './fetchData';

const initialState = {
  opened: false,
  type: '',
  subjectChannel: undefined,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, { payload }) => ({ ...state, ...payload }),
  },
//   extraReducers: (builder) => {
//     builder
//     //   .addCase(fetchData.pending, () => {
//     //     console.log('Pending first data loading...');
//     //   })
//       .addCase(fetchData.fulfilled, (state, { payload }) => (payload.currentChannelId));
//   },
});

export const { setModal } = modalSlice.actions;
export default modalSlice.reducer;
